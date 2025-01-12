import React, { useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import MessageList from "./components/MessageList";
import { fetchChatResponse } from "./services/api";

function App() {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);

  // List of roles for dynamic button rendering
  const roles = [
    { name: "Manager", description: "If you're a Manager" },
    { name: "Developer", description: "If you're a Developer" },
    { name: "QA", description: "If you're a QA (Manual / Automation)" },
    { name: "DevOps", description: "If you're a DevOps Engineer" },
    { name: "Funny", description: "If you're funny" },
  ];

  /**
   * Handle response generation for a given role.
   * @param {string} role - The role for which to fetch the response.
   */
  const handleResponse = async (role) => {
    if (!question.trim()) {
      setError("Please type a question first!");
      return;
    }

    setError("");
    try {
      const response = await fetchChatResponse(question, role);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: question, ai: response, role },
      ]);
    } catch (err) {
      console.error("Error fetching response:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setQuestion(""); // Clear the input after the request
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="chat-title">Testcontainers GenAI Demo</h1>
        <p className="chat-description">
          Ask a question and see how different personas respond.
        </p>
      </header>

      <main className="chat-container">
        <ChatBox
          question={question}
          setQuestion={setQuestion}
          error={error}
          onSendMessage={() => handleResponse("Normal")}
        />

        <div className="chat-buttons">
          {roles.map(({ name, description }) => (
            <button
              key={name}
              className={`chat-button ${name.toLowerCase()}`}
              onClick={() => handleResponse(name)}
            >
              {name}
              <span className="button-label">{description}</span>
            </button>
          ))}
        </div>

        <MessageList messages={messages} />
      </main>
    </div>
  );
}

export default App;
