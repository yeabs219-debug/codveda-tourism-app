import api from "./api";

export async function createBooking(data) {
  const response = await api.post("/bookings", data);
  return response.data;
}

export async function getMyBookings() {
  const response = await api.get("/bookings");
  return response.data;
}

export async function cancelBooking(id) {
  const response = await api.patch(`/bookings/${id}/cancel`);
  return response.data;
}

export async function confirmBooking(id) {
  const response = await api.patch(`/bookings/${id}/confirm`);
  return response.data;
}