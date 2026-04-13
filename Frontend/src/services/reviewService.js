import { API_URL } from "../config/api";

const RESENAS_URL = `${API_URL}/resenas`;

const parseErrorMessage = async (response, fallbackMessage) => {
  try {
    const data = await response.json();
    return data?.detail || data?.message || fallbackMessage;
  } catch (_error) {
    return fallbackMessage;
  }
};

export const getResenas = async () => {
  const response = await fetch(RESENAS_URL);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, "No se pudieron cargar las reseñas"));
  }

  const data = await response.json();
  return Array.isArray(data?.resenas) ? data.resenas : [];
};

export const createResena = async (payload) => {
  const response = await fetch(RESENAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, "No se pudo guardar la reseña"));
  }

  return response.json();
};
