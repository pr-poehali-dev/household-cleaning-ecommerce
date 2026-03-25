const AUTH_URL = "https://functions.poehali.dev/aed10349-1697-4784-94ac-6d73775b02ce";
const ORDERS_URL = "https://functions.poehali.dev/6db791dc-6059-4ecd-869e-3d7fbecc285b";

function getToken() {
  return localStorage.getItem("eco_token") || "";
}

async function post(url: string, body: object) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Session-Token": getToken() },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function get(url: string) {
  const res = await fetch(url, {
    headers: { "X-Session-Token": getToken() },
  });
  return res.json();
}

export const api = {
  register: (email: string, password: string, name: string) =>
    post(AUTH_URL, { action: "register", email, password, name }),

  login: (email: string, password: string) =>
    post(AUTH_URL, { action: "login", email, password }),

  getMe: () => get(AUTH_URL),

  updateMe: (data: { name?: string; phone?: string }) =>
    post(AUTH_URL, { action: "update", ...data }),

  createOrder: (data: object) => post(ORDERS_URL, data),

  getOrders: () => get(ORDERS_URL),
};
