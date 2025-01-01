const API_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:5000" : "http://backend:5000");

console.log(`[DEBUG] Using API URL: ${API_URL}`);

export const fetchChatResponse = async (message, role) => {
  try {
    console.log(`[DEBUG] Sending message: "${message}" with role: "${role}" to ${API_URL}/chat`);

    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, role }),
    });

    if (!response.ok) {
      console.error(`[ERROR] Failed to fetch chat response. Status: ${response.status}, ${response.statusText}`);
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[DEBUG] Received response:`, data);

    return data.response;
  } catch (error) {
    console.error("[ERROR] Fetching chat response failed:", error);
    throw error;
  }
};
