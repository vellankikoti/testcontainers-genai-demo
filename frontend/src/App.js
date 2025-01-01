import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import openai
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", "postgresql://testuser:testpass@postgres-db:5432/testdb"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")
logging.basicConfig(level=logging.DEBUG)

# Database model
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    ai_response = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(50), nullable=False)

@app.before_first_request
def create_tables():
    db.create_all()

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
    data = request.json
    user_message = data.get("message", "").strip()
    role = data.get("role", "Normal")

    if not user_message:
        logging.error("No user message provided.")
        return jsonify({"error": "Message is required"}), 400

    try:
        logging.info(f"Received message: {user_message} with role: {role}")
        prompt = role_prompts.get(role, "You are a helpful assistant.")
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": user_message},
            ],
        )
        ai_response = completion.choices[0].message.content.strip()
        logging.info(f"Generated response: {ai_response}")

        # Save chat history to database
        chat = ChatHistory(user_message=user_message, ai_response=ai_response, role=role)
        db.session.add(chat)
        db.session.commit()

        return jsonify({"response": ai_response})
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
