// On Vercel, the frontend and /api functions share the same origin, so a
// relative path works with zero configuration in production. Locally, the
// Vite dev server (5173) and the Express dev server (5000) are separate,
// so we point at localhost explicitly unless VITE_API_URL overrides it.
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export const api = {
  register: (name, email, password) =>
    request('/auth/register', { method: 'POST', body: { name, email, password } }),
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: { email, password } }),
  getMe: (token) => request('/auth/me', { token }),

  getLetters: (token) => request('/letters', { token }),
  createLetter: (token, letter) => request('/letters', { method: 'POST', body: letter, token }),

  getGoals: (token) => request('/goals', { token }),
  createGoal: (token, goal) => request('/goals', { method: 'POST', body: goal, token }),
  updateGoal: (token, id, updates) =>
    request(`/goals/${id}`, { method: 'PUT', body: updates, token }),

  getMoodHistory: (token) => request('/mood', { token }),
  addMoodEntry: (token, entry) => request('/mood', { method: 'POST', body: entry, token }),

  getTimeline: (token) => request('/timeline', { token }),
  createTimelineEvent: (token, event) =>
    request('/timeline', { method: 'POST', body: event, token }),
};
