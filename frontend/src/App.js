import React, { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [perspective, setPerspective] = useState("");
  const [error, setError] = useState("");

  const handleResponse = async (role) => {
    if (!question.trim()) {
      setError("Please type a question first!");
      return;
    }
    setError("");
    setPerspective(role);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, role }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch response");
      }

      const data = await res.json();
      if (data.response) {
        setResponse(data.response);
      } else {
        setResponse("No response received. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      setResponse("");
    }

    setQuestion(""); // Clear the input field
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h1 className="chat-title">What's your Question?</h1>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {response && (
          <div className="chat-response">
            <p>
              <strong>{perspective}:</strong> {response}
            </p>
          </div>
        )}
        {error && <p className="chat-error">{error}</p>}
        <div className="chat-buttons">
          <button className="chat-button manager" onClick={() => handleResponse("Manager")}>
            Manager
            <span className="button-label">If you're a Manager</span>
          </button>
          <button className="chat-button developer" onClick={() => handleResponse("Developer")}>
            Developer
            <span className="button-label">If you're a Developer</span>
          </button>
          <button className="chat-button qa" onClick={() => handleResponse("QA")}>
            QA
            <span className="button-label">If you're a QA (Manual / Automation)</span>
          </button>
          <button className="chat-button devops" onClick={() => handleResponse("DevOps")}>
            DevOps
            <span className="button-label">If you're a DevOps Engineer</span>
          </button>
          <button className="chat-button funny" onClick={() => handleResponse("Funny")}>
            Fun!!
            <span className="button-label">If you're funny</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
