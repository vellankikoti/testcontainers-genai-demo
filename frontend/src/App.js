import React, { useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import MessageList from "./components/MessageList";
import { fetchChatResponse } from "./services/api";

function App() {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastQuestion, setLastQuestion] = useState("");

  /**
   * Handles fetching responses based on role.
   * If the question changes, it resets to fetch only the "Normal" response first.
   * @param {string} role - The role perspective for the AI response.
   */
  const handleResponse = async (role) => {
    // Validate question input for the "Normal" role
    if (!question.trim() && role === "Normal") {
      setError("Please type a question first!");
      return;
    }
    setError("");

    // Use the last question for role-based responses
    const query = role === "Normal" ? question.trim() : lastQuestion;

    try {
      const response = await fetchChatResponse(query, role);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: query, ai: response, role },
      ]);
    } catch (err) {
      console.error("Error fetching response:", err);
      setError("Failed to fetch response. Please try again.");
    }

    // Save the question when fetching the "Normal" response
    if (role === "Normal") {
      setLastQuestion(question.trim());
      setQuestion(""); // Clear input field after submission
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="chat-title">Testcontainers GenAI Demo</h1>
        <p className="chat-description">
          Type a question and get role-specific responses!
        </p>
      </header>

      <main className="chat-container">
        <ChatBox
          question={question}
          setQuestion={setQuestion}
          onSendMessage={() => handleResponse("Normal")} // Trigger Normal response on Enter
          error={error}
        />

        <div className="chat-buttons">
          {["Manager", "Developer", "QA", "DevOps", "Movie Buff"].map((role) => (
            <button
              key={role}
              className={`chat-button ${role.toLowerCase().replace(" ", "-")}`} // Dynamically generate class name
              onClick={() => handleResponse(role)}
              disabled={!lastQuestion} // Disable buttons until a question is submitted
            >
              {role}
            </button>
          ))}
        </div>

        <MessageList messages={messages} />
      </main>
    </div>
  );
}

export default App;
