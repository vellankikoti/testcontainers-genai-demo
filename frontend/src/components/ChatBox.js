import React from "react";

function ChatBox({ question, setQuestion, error, onSendMessage }) {
  return (
    <div className="chat-box">
      <input
        type="text"
        className="chat-input"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="send-button" onClick={onSendMessage}>
        Send
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default ChatBox;
