from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the ChatHistory model
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    ai_responses = db.Column(db.JSON, nullable=False)

# Create tables
@app.before_first_request
def create_tables():
    db.create_all()

# Chat endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    ai_responses = {"Normal": "Sample response for now"}  # Mock response
    entry = ChatHistory(user_message=user_message, ai_responses=ai_responses)
    db.session.add(entry)
    db.session.commit()
    return jsonify({"responses": ai_responses})

# Health check
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "OK"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
