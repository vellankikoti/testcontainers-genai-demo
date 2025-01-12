/**
 * API Service
 * Handles interactions with the backend server.
 */

// Dynamically resolve the API URL
const API_URL = process.env.REACT_APP_API_BASE_URL || "/api";

/**
 * Fetches a chat response from the backend for a given question and role.
 * 
 * @param {string} message - The user's question.
 * @param {string} role - The role perspective for the AI response.
 * @returns {Promise<string>} The AI-generated response.
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
      throw new Error(
        `Failed to fetch chat response: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(`[ERROR] fetchChatResponse:`, error.message || error);
    throw error;
  }
};

/**
 * Fetches the chat history from the backend.
 * 
 * @returns {Promise<Array>} Array of chat history objects.
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
      throw new Error(
        `Failed to fetch chat history: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`[ERROR] fetchChatHistory:`, error.message || error);
    throw error;
  }
};

/**
 * Fetches the API root status to verify backend availability.
 * 
 * @returns {Promise<string>} The status message from the backend.
 */
export const fetchApiStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch API status: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error(`[ERROR] fetchApiStatus:`, error.message || error);
    throw error;
  }
};
