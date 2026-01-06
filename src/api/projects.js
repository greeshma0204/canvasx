const API_URL = "http://localhost:5000/api/projects";

// Save project
export async function saveProject(blocks) {
  const res = await fetch(`${API_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blocks }),
  });
  return res.json();
}

// Load latest project
export async function loadProject() {
  const res = await fetch(`${API_URL}/latest`);
  return res.json();
}