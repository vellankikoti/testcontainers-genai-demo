import pytest
from unittest.mock import patch
from testcontainers.postgres import PostgresContainer
from app import app, db
import os


@pytest.fixture(scope="module")
def postgres_container():
    """Spin up a PostgreSQL container using Testcontainers."""
    with PostgresContainer("postgres:latest") as postgres:
        os.environ["DATABASE_URL"] = postgres.get_connection_url()
        yield postgres


@pytest.fixture(scope="module")
def test_client_with_mock_openai(postgres_container):
    """Configure Flask app and mock OpenAI API with Testcontainers PostgreSQL."""
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["TESTING"] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()  # Ensure the database tables are created
        yield client
        with app.app_context():
            db.drop_all()  # Cleanup after tests


def mock_openai_response(prompt):
    """Mock OpenAI API response."""
    return {"choices": [{"text": f"Mock response for: {prompt}"}]}


@patch("openai.resources.Completions.create")
def test_mock_openai_response_with_testcontainers(mock_create, test_client_with_mock_openai):
    """Test the /chat endpoint with mocked OpenAI responses and Testcontainers."""
    mock_create.side_effect = lambda **kwargs: mock_openai_response(kwargs["prompt"])

    response = test_client_with_mock_openai.post(
        "/chat",
        json={"message": "Tell me a joke", "role": "Funny"}
    )
    assert response.status_code == 200
    data = response.get_json()

    # Validate mocked response
    assert "response" in data
    assert data["response"] == "Mock response for: Tell me a joke"
