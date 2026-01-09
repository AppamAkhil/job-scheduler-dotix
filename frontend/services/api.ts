const API_BASE = "http://localhost:5000";

export async function fetchJobs(params = "") {
  const res = await fetch(`${API_BASE}/jobs${params}`);
  return res.json();
}

export async function createJob(data: any) {
  return fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function runJob(id: number) {
  return fetch(`${API_BASE}/run-job/${id}`, { method: "POST" });
}

export async function getJob(id: string) {
  const res = await fetch(`${API_BASE}/jobs/${id}`);
  return res.json();
}

export async function deleteJob(id: number) {
  return fetch(`http://localhost:5000/jobs/${id}`, {
    method: "DELETE"
  });
}
