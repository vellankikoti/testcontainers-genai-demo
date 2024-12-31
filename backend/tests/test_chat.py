import pytest
from testcontainers.postgres import PostgresContainer
import requests

def test_chat_endpoint():
    with PostgresContainer("postgres:latest") as postgres:
        db_url = postgres.get_connection_url()
        response = requests.post(
            "http://localhost:5000/chat",
            json={"message": "Explain DevOps culture"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "Normal" in data["responses"]
        assert "DevOps Engineer" in data["responses"]
