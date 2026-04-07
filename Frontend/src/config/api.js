import Constants from "expo-constants";

const expoConfig = Constants.expoConfig || Constants.manifest;

export const API_URL =
  expoConfig?.extra?.API_URL ||
  "https://unvoluble-pei-subrhombic.ngrok-free.dev";
