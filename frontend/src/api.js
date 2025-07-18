export async function getAIGeneratedContent(prompt, token) {
  const res = await fetch(`${API_BASE_URL}/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to get AI content");
  }
  return res.json();
}
const API_BASE_URL = "http://127.0.0.1:8000";

export async function login(username, password) {
  const res = await fetch(`${API_BASE_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export async function register(username, password) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Registration failed");
  }
  return res.json();
}

export async function getLesson(topic, token) {
  const res = await fetch(
    `${API_BASE_URL}/lesson?topic=${encodeURIComponent(topic)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) throw new Error("Failed to get lesson");
  return res.json();
}
