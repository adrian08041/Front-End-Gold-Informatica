import { useMutation } from "@tanstack/react-query";
import { authRequestType } from "../types/auth";
import { authRequest } from "../requests/authRquest";

export function useAuth() {
  const mutation = useMutation({
    mutationFn: (authData: authRequestType) => authRequest(authData),
  });
  return mutation;
}
