import { AUTH_TOKEN } from "./constants";

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_TOKEN);
};
