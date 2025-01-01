import React from "react";

function ChatBox({ question, setQuestion, response, error, onSendMessage }) {
  return (
    <div className="chat-box">
      <input
        type="text"
        className="chat-input"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="chat-send-button" onClick={onSendMessage}>
        Ask
      </button>
      {response && (
        <div className="chat-response">
          <p><strong>Response:</strong> {response}</p>
        </div>
      )}
      {error && <p className="chat-error">{error}</p>}
    </div>
  );
}

export default ChatBox;
