import React, { useState } from "react";
import { sendMessage } from "../services/api";
import MessageList from "./MessageList";

const characters = ["Normal", "Manager", "Developer", "Tester", "DevOps Engineer", "Funny"];

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState("Normal");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const response = await sendMessage(message);
      const newMessage = {
        userMessage: message,
        responses: response.responses,
      };
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
    setMessage("");
  };

  return (
    <div>
      <div>
        <select
          value={selectedCharacter}
          onChange={(e) => setSelectedCharacter(e.target.value)}
        >
          {characters.map((char) => (
            <option key={char} value={char}>
              {char}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
      <MessageList messages={messages} selectedCharacter={selectedCharacter} />
    </div>
  );
};

export default ChatBox;
