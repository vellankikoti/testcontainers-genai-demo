import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)

# Load database URL from environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://testuser:testpass@db:5432/testdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define the ChatHistory model
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    ai_responses = db.Column(db.JSON, nullable=False)

# Ensure tables are created
@app.before_first_request
def create_tables():
    try:
        db.create_all()
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating database tables: {str(e)}")

# Health check endpoint
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "OK"})

# Test database connectivity
@app.route("/test-db", methods=["GET"])
def test_db():
    try:
        db.session.execute("SELECT 1").scalar()
        return jsonify({"status": "Database connected successfully!"})
    except Exception as e:
        return jsonify({"status": "Error connecting to database", "error": str(e)}), 500

# Chat endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    ai_responses = {"Normal": "Mock response"}  # Replace with actual AI response logic
    try:
        chat_entry = ChatHistory(user_message=user_message, ai_responses=ai_responses)
        db.session.add(chat_entry)
        db.session.commit()
        return jsonify({"responses": ai_responses})
    except Exception as e:
        return jsonify({"status": "Error saving to database", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
