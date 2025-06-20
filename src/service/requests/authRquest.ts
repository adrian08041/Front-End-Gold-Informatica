import { api } from "../api";
import { authRequestType } from "../types/auth";

export function authRequest(authData: authRequestType) {
  return api.post("/auth/login", {
    email: authData.email,
    password: authData.password,
  });
}
