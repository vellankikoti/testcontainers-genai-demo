import React, { useState } from "react";
import MessageList from "./MessageList";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async (role) => {
    if (!question.trim()) return;
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question, role }),
    });
    const data = await response.json();
    if (data.response) {
      setMessages([...messages, { user: question, role, response: data.response }]);
    }
    setQuestion("");
  };

  return (
    <div className="chat-box">
      <MessageList messages={messages} />
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="What's your question?"
        className="chat-input"
      />
      <div className="button-group">
        {["Manager", "Developer", "QA", "DevOps", "Funny"].map((role) => (
          <button key={role} onClick={() => sendMessage(role)}>
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChatBox;
