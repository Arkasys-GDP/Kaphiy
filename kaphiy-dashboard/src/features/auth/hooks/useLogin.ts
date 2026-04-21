"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authSlice";
import { fetcher, ApiError } from "@/src/shared/api/fetcher";
import { useSound } from "@/src/features/notifications/useSound";

interface LoginPayload {
  pin: string;
}

interface LoginResponse {
  access_token: string;
  barista: { id: number; name: string };
}

export function useLogin() {
  const login = useAuthStore((s) => s.login);
  const { unlock } = useSound();

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: (payload) =>
      fetcher<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: ({ access_token }) => {
      unlock();
      login(access_token);
    },
  });
}
