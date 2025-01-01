const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const fetchChatResponse = async (message, role) => {
  console.log("API_URL:", API_URL);
  console.log(`Sending message: "${message}" with role: "${role}"`);

  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, role }),
    });

    if (!response.ok) {
      console.error("Error response from server:", response.statusText);
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Received response from API:", data);
    return data.response;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
};
