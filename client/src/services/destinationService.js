import api from "./api";

export async function getAllDestinations() {
  const response = await api.get("/destinations");
  return response.data;
}

export async function getDestinationById(id) {
  const response = await api.get(`/destinations/${id}`);
  return response.data;
}

export async function createDestination(data) {
  const response = await api.post("/destinations", data);
  return response.data;
}

export async function updateDestination(id, data) {
  const response = await api.put(`/destinations/${id}`, data);
  return response.data;
}

export async function deleteDestination(id) {
  const response = await api.delete(`/destinations/${id}`);
  return response.data;
}