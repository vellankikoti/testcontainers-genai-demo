export const fetchChatResponse = async (message, role) => {
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, role }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from server.");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
};
