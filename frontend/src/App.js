import React, { useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import MessageList from "./components/MessageList";
import { fetchChatResponse } from "./services/api";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [perspective, setPerspective] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);

  const handleResponse = async (role) => {
    if (!question.trim()) {
      setError("Please type a question first!");
      return;
    }
    setError("");
    setPerspective(role);

    try {
      const res = await fetchChatResponse(question, role);
      setResponse(res);
      setMessages((prev) => [
        ...prev,
        { user: question, ai: res, role },
      ]);
    } catch (err) {
      console.error("Error fetching response:", err);
      setError(err.message || "An unexpected error occurred.");
      setResponse("");
    }
    setQuestion("");
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h1 className="chat-title">Testcontainers GenAI Demo</h1>
        <ChatBox
          question={question}
          setQuestion={setQuestion}
          response={response}
          error={error}
          onSendMessage={() => handleResponse("Normal")}
        />
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
        <MessageList messages={messages} />
      </div>
    </div>
  );
}

export default App;
