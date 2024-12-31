import React, { useState } from "react";
import MessageList from "./MessageList";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { message };

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMessage),
      });

      const data = await response.json();

      setMessages([...messages, { user: message, response: data.responses.Normal }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <MessageList messages={messages} />
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "80%", padding: "10px", fontSize: "16px" }}
        />
        <button onClick={handleSendMessage} style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
