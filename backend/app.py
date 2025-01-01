import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", "postgresql://testuser:testpass@db:5432/testdb"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

client = OpenAI()

# Database model for chat history
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    ai_response = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(50), nullable=False)

# Ensure tables are created
@app.before_first_request
def create_tables():
    db.create_all()

# Role-specific prompts
role_prompts = {
    "Manager": "Respond as a strategic Manager.",
    "Developer": "Respond as a Developer with code examples.",
    "QA": "Respond as a QA Tester with detailed test cases.",
    "DevOps": "Respond as a DevOps Engineer with deployment advice.",
    "Funny": "Respond humorously with jokes or sarcasm.",
}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    role = data.get("role", "Normal")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Generate response from OpenAI
    prompt = f"{role_prompts.get(role, '')}\nUser: {user_message}\nAI:"
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            prompt=prompt,
            max_tokens=150,
        )
        ai_response = completion.choices[0].text.strip()

        # Save to database
        chat = ChatHistory(user_message=user_message, ai_response=ai_response, role=role)
        db.session.add(chat)
        db.session.commit()

        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/history", methods=["GET"])
def get_history():
    """Retrieve chat history."""
    chats = ChatHistory.query.all()
    return jsonify(
        [{"id": chat.id, "user": chat.user_message, "ai": chat.ai_response, "role": chat.role} for chat in chats]
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
