import React from "react";

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className="message-item">
          <p><strong>You:</strong> {message.user}</p>
          <p><strong>{message.role}:</strong> {message.ai}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
