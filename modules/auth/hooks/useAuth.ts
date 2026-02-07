"use client";

import { create } from "zustand";
import { toast } from "sonner";
import { LoginCredentials, User } from "../domain";
import { Authenticator } from "../application";
import { MockAuthRepository } from "../infrastructure";

/** localStorage key where the JWT token is persisted. */
const TOKEN_KEY = "auth_token";

// Application layer instances (dependency injection)
const repository = new MockAuthRepository();
const authenticator = new Authenticator(repository);

/** Authentication store state and actions. */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Whether the session has already been checked on app load (prevents premature redirects). */
  hasChecked: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

/**
 * Zustand store for managing authentication state.
 * Persists the token in localStorage and validates it on page reload.
 */
export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  hasChecked: false,
  error: null,

  /** Authenticates the user with email and password, persists the token in localStorage. */
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
      const message = error instanceof Error ? error.message : "No pudimos iniciar sesión. Por favor, intenta de nuevo.";
      toast.error(message);
      set({ isLoading: false, error: message });
    }
  },

  /** Logs out by removing the token from localStorage and resetting the state. */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  /** Restores the session from localStorage on app startup (validates the stored token). */
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      set({ hasChecked: true });
      return;
    }

    const result = authenticator.validateToken(token);
    if (result) {
      set({
        user: result.user,
        token: result.token,
        isAuthenticated: true,
        hasChecked: true,
      });
    } else {
      localStorage.removeItem(TOKEN_KEY);
      set({ hasChecked: true });
    }
  },
}));
