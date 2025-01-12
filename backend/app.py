import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from openai import OpenAI  # Left unchanged as per your requirement
from dotenv import load_dotenv

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", "postgresql://testuser:testpass@postgres-db:5432/testdb"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Database model for chat history
class ChatHistory(db.Model):
    __tablename__ = "chat_history"  # Explicitly name the table
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    ai_response = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(50), nullable=False)

@app.before_first_request
def create_tables():
    """
    Create database tables before the first request.
    """
    try:
        db.create_all()  # Ensure tables are created
        app.logger.info("Database tables created successfully.")
    except Exception as e:
        app.logger.error(f"Error creating tables: {str(e)}")

# Role-specific prompts
role_prompts = {
    "Manager": "You are a Manager. Provide strategic advice.",
    "Developer": "You are a Developer. Provide technical insights and code examples.",
    "QA": "You are a QA Tester. Provide detailed test cases.",
    "DevOps": "You are a DevOps Engineer. Provide deployment advice.",
    "Funny": "You are a humorous assistant. Respond with jokes or sarcasm.",
    "Normal": "You are a helpful assistant. Provide straightforward advice.",
}

@app.route("/chat", methods=["POST"])
def chat():
    """
    Handle user messages and generate AI responses based on the role.
    """
    data = request.json
    user_message = data.get("message", "").strip()
    role = data.get("role", "Normal")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        prompt = role_prompts.get(role, "You are a helpful assistant.")
        messages = [
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_message}
        ]

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Left unchanged as per your requirement
            messages=messages,
            max_tokens=150,
            temperature=0.7
        )

        ai_response = response.choices[0].message.content.strip()

        # Save to database
        chat = ChatHistory(user_message=user_message, ai_response=ai_response, role=role)
        db.session.add(chat)
        db.session.commit()

        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route("/history", methods=["GET"])
def get_history():
    """
    Retrieve the chat history from the database.
    """
    try:
        chats = ChatHistory.query.all()
        history = [
            {
                "id": chat.id,
                "user_message": chat.user_message,
                "ai_response": chat.ai_response,
                "role": chat.role,
            }
            for chat in chats
        ]
        return jsonify(history)
    except Exception as e:
        app.logger.error(f"Error fetching chat history: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == "__main__":
    # Ensure tables are created before starting the app
    with app.app_context():
        try:
            db.create_all()
            app.logger.info("Database tables created successfully on startup.")
        except Exception as e:
            app.logger.error(f"Error creating tables on startup: {str(e)}")
    app.run(host="0.0.0.0", port=5000)
