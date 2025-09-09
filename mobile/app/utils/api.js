const API_BASE_URL = "http://192.168.1.7:3000/api";

export const apiCall = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("API error", err);
    return { error: err.message || "Network error" };
  }
};