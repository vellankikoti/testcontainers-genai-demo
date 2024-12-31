import pytest
from testcontainers.postgres import PostgresContainer
from app import app, db, ChatHistory
import os

@pytest.fixture(scope="module")
def postgres_container():
    """Spin up a PostgreSQL container using Testcontainers."""
    with PostgresContainer("postgres:latest") as postgres:
        os.environ["DATABASE_URL"] = postgres.get_connection_url()
        yield postgres


@pytest.fixture(scope="module")
def app_with_testcontainers(postgres_container):
    """Configure Flask app with Testcontainers PostgreSQL."""
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["TESTING"] = True
    with app.app_context():
        db.create_all()  # Create database schema
        yield app
        db.drop_all()  # Cleanup database after tests


def test_database_insert_and_retrieve(app_with_testcontainers):
    """Test inserting and retrieving data in a Testcontainers-backed database."""
    with app_with_testcontainers.app_context():
        # Insert a record
        chat = ChatHistory(
            user_message="What is DevOps?",
            ai_response="DevOps is a culture of collaboration.",
            role="Manager"
        )
        db.session.add(chat)
        db.session.commit()

        # Retrieve and validate the record
        result = ChatHistory.query.all()
        assert len(result) == 1
        assert result[0].user_message == "What is DevOps?"
        assert result[0].ai_response == "DevOps is a culture of collaboration."
        assert result[0].role == "Manager"
