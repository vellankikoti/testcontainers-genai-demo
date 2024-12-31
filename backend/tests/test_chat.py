import pytest
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
def test_client(postgres_container):
    """Configure Flask app to use Testcontainers PostgreSQL."""
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["TESTING"] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()  # Ensure the database tables are created
        yield client
        with app.app_context():
            db.drop_all()  # Clean up after tests


def test_chat_endpoint_with_testcontainers(test_client):
    """Test the /chat endpoint with a Testcontainers-backed database."""
    response = test_client.post(
        "/chat",
        json={"message": "Explain DevOps culture", "role": "DevOps"}
    )
    assert response.status_code == 200
    data = response.get_json()
    assert "response" in data
    assert len(data["response"]) > 0
