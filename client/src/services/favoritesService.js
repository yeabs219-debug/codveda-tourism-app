import api from "./api";

export async function addFavourite(destinationId) {
  const response = await api.post("/favourites", { destinationId });
  return response.data;
}

export async function getMyFavourites() {
  const response = await api.get("/favourites");
  return response.data;
}

export async function removeFavourite(destinationId) {
  const response = await api.delete(`/favourites/${destinationId}`);
  return response.data;
}