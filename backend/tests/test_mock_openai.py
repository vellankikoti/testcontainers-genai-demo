from unittest.mock import patch
import requests

def mock_openai_response(prompt):
    return {"choices": [{"text": f"Mock response for: {prompt}"}]}

def test_chat_with_mocked_openai():
    with patch("openai.Completion.create") as mock_create:
        mock_create.side_effect = lambda **kwargs: mock_openai_response(kwargs['prompt'])

        response = requests.post(
            "http://localhost:5000/chat",
            json={"message": "Tell me a joke"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "Normal" in data["responses"]
        assert "Mock response" in data["responses"]["Normal"]
