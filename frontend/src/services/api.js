const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const fetchChatResponse = async (message, role) => {
  console.log(`[DEBUG] Sending request to ${API_URL}/chat with message: "${message}" and role: "${role}"`);
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, role }),
    });

    if (!response.ok) {
      throw new Error(`[ERROR] Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[DEBUG] Received response:`, data);
    return data.response;
  } catch (error) {
    console.error("[ERROR] Error fetching chat response:", error);
    throw error;
  }
};
