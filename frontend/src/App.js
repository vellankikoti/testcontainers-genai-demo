import React, { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [perspective, setPerspective] = useState("");

  const handleResponse = (perspective) => {
    if (!question.trim()) {
      alert("Please type a question first!");
      return;
    }

    // Mock responses based on perspective
    const responses = {
      Manager: `As a Manager, I would say: "${question}" needs strategic thinking!`,
      Developer: `As a Developer: Here’s some code for "${question}"...`,
      QA: `As QA, I’d say: Let’s write test cases for "${question}".`,
      DevOps: `As a DevOps Engineer: Let's deploy your "${question}" smoothly.`,
      Funny: `Haha! "${question}" reminds me of a joke!`,
    };

    setPerspective(perspective);
    setResponse(responses[perspective] || "Hmm, I don't know!");
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">What do you want to ask me?</h1>
        <input
          type="text"
          className="question-input"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="buttons">
          {["Manager", "Developer", "QA", "DevOps", "Funny"].map((role) => (
            <button
              key={role}
              className={`role-button ${role.toLowerCase()}`}
              onClick={() => handleResponse(role)}
            >
              If you're a {role}
            </button>
          ))}
        </div>
        {response && (
          <div className="response">
            <h2>{perspective} Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
