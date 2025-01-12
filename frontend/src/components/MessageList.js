import React from "react";

/**
 * MessageList Component
 * Renders a list of user messages and AI responses.
 *
 * Props:
 * - messages: Array of message objects with the following structure:
 *   { user: string, ai: string, role: string }
 */
function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className="message-item">
          <p>
            <strong>You:</strong> {message.user}
          </p>
          <p>
            <strong>{message.role}:</strong> {message.ai}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
