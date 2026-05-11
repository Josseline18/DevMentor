import Constants from "expo-constants";
import { getAccessToken } from "../services/sessionService";

const expoConfig = Constants.expoConfig || Constants.manifest;

export const API_URL =
  expoConfig?.extra?.API_URL ||
  "http://54.173.214.233:8000";   

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAccessToken();
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  const defaultHeaders = isFormData
    ? {}
    : {
        "Content-Type": "application/json",
      };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
};
