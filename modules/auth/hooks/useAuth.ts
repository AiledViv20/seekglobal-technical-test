"use client";

import { create } from "zustand";
import { LoginCredentials, User } from "../domain";
import { Authenticator } from "../application";
import { MockAuthRepository } from "../infrastructure";

const TOKEN_KEY = "auth_token";

const repository = new MockAuthRepository();
const authenticator = new Authenticator(repository);

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authenticator.login(credentials);
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

    const result = authenticator.validateToken(token);
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
