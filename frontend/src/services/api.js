const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const fetchChatResponse = async (message, role) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch response");
    }

    const data = await response.json();
    return data.response || "No response received.";
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
};
