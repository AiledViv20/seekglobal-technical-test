import { create } from "zustand";
import { AuthState, LoginCredentials } from "@/lib/types/auth.types";
import * as authService from "@/lib/services/auth.service";

const TOKEN_KEY = "auth_token";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login(credentials);
      localStorage.setItem(TOKEN_KEY, response.token);

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Error al iniciar sesión",
      });
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    const result = authService.validateToken(token);
    if (result) {
      set({
        user: result.user,
        token: result.token,
        isAuthenticated: true,
      });
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
}));
