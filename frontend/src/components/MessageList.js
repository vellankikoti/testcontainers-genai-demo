import React from "react";

function MessageList({ messages }) {
  return (
    <div style={{ margin: "20px", maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <div><strong>User:</strong> {msg.user}</div>
          <div><strong>AI:</strong> {msg.response}</div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
