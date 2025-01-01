import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all origins

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", "postgresql://testuser:testpass@postgres-db:5432/testdb"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Database model for chat history
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    ai_response = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(50), nullable=False)

@app.before_first_request
def create_tables():
    """Create database tables before the first request."""
    db.create_all()

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
        # Construct the OpenAI API request
        prompt = role_prompts.get(role, "You are a helpful assistant.")
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": user_message},
            ],
            max_tokens=150,
            temperature=0.7,
        )
        ai_response = completion.choices[0].message["content"].strip()

        # Save the interaction to the database
        chat = ChatHistory(user_message=user_message, ai_response=ai_response, role=role)
        db.session.add(chat)
        db.session.commit()

        return jsonify({"response": ai_response})
    except openai.error.InvalidRequestError as e:
        print(f"OpenAI API InvalidRequestError: {str(e)}")
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 400
    except openai.error.AuthenticationError as e:
        print(f"OpenAI API AuthenticationError: {str(e)}")
        return jsonify({"error": "Invalid OpenAI API key."}), 401
    except openai.error.OpenAIError as e:
        print(f"OpenAI API Error: {str(e)}")
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 500
    except Exception as e:
        print(f"Internal Server Error: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route("/history", methods=["GET"])
def get_history():
    """
    Retrieve the chat history from the database.
    """
    try:
        chats = ChatHistory.query.all()
        return jsonify(
            [
                {
                    "id": chat.id,
                    "user": chat.user_message,
                    "ai": chat.ai_response,
                    "role": chat.role,
                }
                for chat in chats
            ]
        )
    except Exception as e:
        print(f"Error retrieving history: {str(e)}")
        return jsonify({"error": f"Failed to retrieve history: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
