# testcontainers-genai-demo

## Overview
This repository demonstrates an exciting and interactive application built using Generative AI. It showcases six distinct characters responding to user queries in unique styles, all while using **Testcontainers** to test backend and database interactions seamlessly. The application is built with Flask (backend), React (frontend), PostgreSQL (database), and Docker for containerization.

---

## Features

### 1. Multi-Character AI Responses
- **Normal**: Straightforward and simple responses.
- **Manager**: Talented, inspiring, and witty responses.
- **Developer**: Technical insights with code examples.
- **Tester**: Focused on finding flaws and raising bugs.
- **DevOps Engineer**: Deployment-focused, with professional tools and best practices.
- **Funny Movie Buff**: Satirical responses inspired by popular movies.

### 2. Interactive Frontend
- Toggle between characters to view different perspectives for the same query.
- Dynamic and user-friendly interface built with React.

### 3. Backend with Flask
- Handles character-based AI response generation.
- Stores user queries and responses in PostgreSQL.

### 4. Testcontainers Integration
- Automates database testing by spinning up isolated PostgreSQL containers.

---

## Prerequisites

1. **Install Software**:
    - Python (>= 3.8)
    - Node.js (>= 14)
    - Docker and Docker Compose
    - pip/pip3

2. **Clone the Repository**:
```bash
$ git clone https://github.com/your-username/testcontainers-genai-demo.git
$ cd testcontainers-genai-demo
```

---

## Directory Structure

```plaintext
testcontainers-genai-demo/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── database/
│   │   ├── init.sql
│   ├── tests/
│   │   ├── test_chat.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── ChatBox.js
│   │   │   ├── MessageList.js
│   │   ├── services/
│   │   │   ├── api.js
│   ├── package.json
│   ├── Dockerfile
├── docker-compose.yml
├── README.md
└── .env.example
```

---

## Setting Up the Application

### 1. **Backend Setup**
1. Navigate to the backend folder:
    ```bash
    $ cd backend
    ```
2. Create a Python virtual environment and activate it:
    ```bash
    $ python3 -m venv venv
    $ source venv/bin/activate   # Linux/Mac
    $ venv\Scripts\activate     # Windows
    ```
3. Install dependencies:
    ```bash
    $ pip install -r requirements.txt
    ```
4. Set up the `.env` file for environment variables:
    ```plaintext
    OPENAI_API_KEY=your-openai-api-key
    DATABASE_URL=postgresql://testuser:testpass@db:5432/testdb
    ```
5. Run the backend server:
    ```bash
    $ flask run
    ```

### 2. **Frontend Setup**
1. Navigate to the frontend folder:
    ```bash
    $ cd ../frontend
    ```
2. Install dependencies:
    ```bash
    $ npm install
    ```
3. Run the frontend server:
    ```bash
    $ npm start
    ```

### 3. **Database Setup**
1. Spin up PostgreSQL using Docker Compose:
    ```bash
    $ docker-compose up -d db
    ```
2. Initialize the database:
    ```bash
    $ docker exec -it <db-container-id> psql -U testuser -d testdb
    CREATE TABLE ChatHistory (
        id SERIAL PRIMARY KEY,
        user_message TEXT NOT NULL,
        ai_response TEXT NOT NULL
    );
    ```

---

## Running the Complete Application
1. Start all services with Docker Compose:
    ```bash
    $ docker-compose up --build
    ```
2. Access the frontend at: [http://localhost:3000](http://localhost:3000)
3. Access the backend at: [http://localhost:5000](http://localhost:5000)

---

## Testing with Testcontainers

### 1. Install Testcontainers
1. Ensure the Python virtual environment is active.
2. Install Testcontainers:
    ```bash
    $ pip install testcontainers
    ```

### 2. Write and Run Tests
1. Navigate to the `backend/tests` folder.
2. Run the test cases:
    ```bash
    $ pytest test_chat.py
    ```
3. Verify that all tests pass.

---

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

---

## License
This project is licensed under the MIT License.

---

## Resources
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Testcontainers Python](https://testcontainers-python.readthedocs.io/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
