import React from "react";

/**
 * ChatBox Component
 * Renders an input box for user queries and a send button to submit the message.
 *
 * Props:
 * - question: Current value of the input field.
 * - setQuestion: Function to update the input field value.
 * - onSendMessage: Function to handle the message submission.
 * - error: Error message to display if validation fails.
 */
function ChatBox({ question, setQuestion, onSendMessage, error }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <div className="chat-box">
      <input
        type="text"
        className="chat-input"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown} // Allow Enter key to submit
      />
      <button className="send-button" onClick={onSendMessage}>
        Send
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ChatBox;
