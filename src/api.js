const BASE_URL = "http://localhost:8081/api";

export const registerUser = async (user) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const loginUser = async (user) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getUserProfile = async (id) => {
  const res = await fetch(`${BASE_URL}/auth/user/${id}`);
  return res.json();
};

export const getBicycles = async () => {
  const res = await fetch(`${BASE_URL}/bicycles`);
  return res.json();
};

export const bookBicycle = async (userId, bicycleId, start, end) => {
  const res = await fetch(
    `${BASE_URL}/bookings?userId=${userId}&bicycleId=${bicycleId}&start=${start}&end=${end}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getUserBookings = async (userId) => {
  const res = await fetch(`${BASE_URL}/bookings/user/${userId}`);
  return res.json();
};

export const deleteBooking = async (id) => {
  await fetch(`${BASE_URL}/bookings/${id}`, { method: "DELETE" });
};