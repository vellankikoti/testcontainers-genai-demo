import React from "react";

/**
 * ChatBox Component
 * Handles user input and submission via Enter key or external button clicks.
 *
 * Props:
 * - question: Current question input.
 * - setQuestion: Updates the question state in the parent component.
 * - onSendMessage: Function to handle message submission (triggered on Enter key press).
 * - error: Error message to display, if any.
 */
function ChatBox({ question, setQuestion, onSendMessage, error }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSendMessage("Normal"); // Automatically fetch Normal response on Enter
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
        onKeyDown={handleKeyDown} // Trigger on Enter key press
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ChatBox;
