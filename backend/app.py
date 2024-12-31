from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import openai
import os

# Initialize Flask app and configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///test.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# ChatHistory Model
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    ai_responses = db.Column(db.JSON, nullable=False)

# Chat Endpoint
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    prompts = {
        "Normal": user_message,
        "Manager": f"Answer as a talented manager: {user_message}",
        "Developer": f"Answer with code examples: {user_message}",
        "Tester": f"Answer as a tester finding bugs: {user_message}",
        "DevOps Engineer": f"Answer as a DevOps engineer: {user_message}",
        "Funny": f"Answer using funny movie dialogues: {user_message}"
    }

    responses = {}
    for character, prompt in prompts.items():
        try:
            ai_response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                max_tokens=100
            ).choices[0].text.strip()
            responses[character] = ai_response
        except Exception as e:
            responses[character] = f"Error generating response: {str(e)}"

    chat_entry = ChatHistory(user_message=user_message, ai_responses=responses)
    db.session.add(chat_entry)
    db.session.commit()

    return jsonify({"responses": responses})

# Health Check
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "OK"})

if __name__ == "__main__":
    db.create_all()
    app.run(host="0.0.0.0", port=5000)
