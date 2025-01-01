import React, { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [perspective, setPerspective] = useState("");

  const handleResponse = async (role) => {
    if (!question.trim()) {
      alert("Please type a question first!");
      return;
    }
    setPerspective(role);
    const response = await fetch("http://18.212.100.96:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, role }),
      });
      const data = await response.json();
      console.log(data);
      if (data.response) {
        setResponse(data);
      }
      setQuestion("");


    // Mock responses based on role
    // const responses = {
    //   Manager: `As a Manager, I think "${question}" requires leadership insights!`,
    //   Developer: `As a Developer: Here's some pseudocode for "${question}"...`,
    //   QA: `As QA, I’d say: "${question}" needs thorough testing.`,
    //   DevOps: `As a DevOps Engineer: "${question}" will be deployed seamlessly.`,
    //   Funny: `Haha! "${question}" reminds me of a joke.`,
    // };

    // setPerspective(role);
    // setResponse(responses[role]);
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h1 className="chat-title">What's your Question?</h1>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {response && (
          <div className="chat-response">
            <p><strong>{perspective}:</strong> {response}</p>
          </div>
        )}
        <div className="chat-buttons">
          <button className="chat-button manager" onClick={() => handleResponse("Manager")}>
            Manager
            <span className="button-label">If you're a Manager</span>
          </button>
          <button className="chat-button developer" onClick={() => handleResponse("Developer")}>
            Developer
            <span className="button-label">If you're a Developer</span>
          </button>
          <button className="chat-button qa" onClick={() => handleResponse("QA")}>
            QA
            <span className="button-label">If you're a QA (Manual / Automation)</span>
          </button>
          <button className="chat-button devops" onClick={() => handleResponse("DevOps")}>
            DevOps
            <span className="button-label">If you're a DevOps Engineer</span>
          </button>
          <button className="chat-button funny" onClick={() => handleResponse("Funny")}>
            Fun!!
            <span className="button-label">If you're funny</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
