import { LoginCredentials, AuthResponse } from "@/lib/types/auth.types";
import { MOCK_USERS, generateMockToken, decodeMockToken } from "@/lib/mock/auth.mock";

const SIMULATED_DELAY = 800;

/**
 * Simula una petición de login contra el backend.
 * Valida credenciales contra los datos mock y retorna un token JWT simulado.
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  const match = MOCK_USERS.find(
    (u) => u.user.email === credentials.email && u.password === credentials.password
  );

  if (!match) {
    throw new Error("Las credenciales no son correctas. Asegúrate de que tu correo y contraseña estén bien escritos.");
  }

  const token = generateMockToken(match.user);

  return { user: match.user, token };
}

/**
 * Valida un token JWT simulado y retorna los datos del usuario si es válido.
 */
export function validateToken(token: string): AuthResponse | null {
  const payload = decodeMockToken(token);
  if (!payload) return null;

  const match = MOCK_USERS.find((u) => u.user.id === payload.sub);
  if (!match) return null;

  return { user: match.user, token };
}
