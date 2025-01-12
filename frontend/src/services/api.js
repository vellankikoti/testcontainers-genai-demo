/**
 * API Service
 * Handles interactions with the backend server for the Testcontainers GenAI Demo application.
 */

const API_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "http://backend:5000");

/**
 * Fetches a chat response from the backend for a given question and role.
 * 
 * @param {string} message - The user's question.
 * @param {string} role - The role perspective for the AI response.
 * @returns {Promise<string>} The AI-generated response.
 * @throws Will throw an error if the fetch request fails.
 */
export const fetchChatResponse = async (message, role) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, role }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chat response: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(`[ERROR] fetchChatResponse:`, error);
    throw error;
  }
};

/**
 * Fetches the chat history from the backend.
 * 
 * @returns {Promise<Array>} Array of chat history objects.
 * @throws Will throw an error if the fetch request fails.
 */
export const fetchChatHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chat history: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`[ERROR] fetchChatHistory:`, error);
    throw error;
  }
};
