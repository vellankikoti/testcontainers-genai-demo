import React, { useState } from "react";
import "./App.css";
import { fetchChatResponse } from "./services/api";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleResponse = async (role) => {
    console.log(`Triggered handleResponse with role: ${role}`);

    if (!question.trim()) {
      console.error("No question provided. Showing error.");
      setError("Please type a question first!");
      return;
    }
    setError("");

    try {
      console.log("Calling fetchChatResponse...");
      const res = await fetchChatResponse(question, role);
      console.log("Response received:", res);
      setResponse(res);
    } catch (err) {
      console.error("Error in handleResponse:", err);
      setError(err.message || "An unexpected error occurred.");
    }
    setQuestion("");
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h1 className="chat-title">Testcontainers GenAI Demo</h1>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="send-button" onClick={() => handleResponse("Normal")}>
          Send
        </button>
        {error && <p className="error">Error: {error}</p>}
        {response && <p className="response">{response}</p>}
        <div className="chat-buttons">
          <button onClick={() => handleResponse("Manager")}>Manager</button>
          <button onClick={() => handleResponse("Developer")}>Developer</button>
          <button onClick={() => handleResponse("QA")}>QA</button>
          <button onClick={() => handleResponse("DevOps")}>DevOps</button>
          <button onClick={() => handleResponse("Funny")}>Funny</button>
        </div>
      </div>
    </div>
  );
}

export default App;
