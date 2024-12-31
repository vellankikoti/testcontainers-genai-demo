import React from "react";

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <p><strong>You:</strong> {msg.user}</p>
          <p><strong>{msg.role}:</strong> {msg.response}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
