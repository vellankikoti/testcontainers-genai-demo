import React from "react";

const MessageList = ({ messages, selectedCharacter }) => {
  return (
    <div>
      <h2>Conversation</h2>
      {messages.length === 0 ? (
        <p>No messages yet. Start the conversation!</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "1em" }}>
            <div>
              <strong>You:</strong> {msg.userMessage}
            </div>
            <div>
              <strong>{selectedCharacter}:</strong> {msg.responses[selectedCharacter]}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
