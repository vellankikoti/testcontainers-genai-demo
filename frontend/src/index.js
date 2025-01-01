import React from "react";
import ReactDOM from "react-dom";
import "./App.css"; // Correctly pointing to the App.css file
import App from "./App";

// Render the App component into the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
