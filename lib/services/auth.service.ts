import { LoginCredentials, AuthResponse, User } from "@/lib/types/auth.types";
import { findByEmailAndPassword, findById } from "@/lib/mock/auth.mock";

const SIMULATED_DELAY = 800;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

/**
 * Genera un token JWT simulado con payload en base64.
 */
function generateToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000,
    })
  );
  const signature = btoa("mock-signature");

  return `${header}.${payload}.${signature}`;
}

/**
 * Decodifica el payload de un token JWT simulado.
 */
function decodeToken(token: string): { sub: string; name: string; email: string; exp: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

/**
 * Simula una petición de login contra el backend.
 * Valida credenciales y retorna un token JWT simulado.
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  await delay();

  const match = findByEmailAndPassword(credentials.email, credentials.password);

  if (!match) {
    throw new Error("Las credenciales no son correctas. Asegúrate de que tu correo y contraseña estén bien escritos.");
  }

  const token = generateToken(match.user);

  return { user: match.user, token };
}

/**
 * Valida un token JWT simulado y retorna los datos del usuario si es válido.
 */
export function validateToken(token: string): AuthResponse | null {
  const payload = decodeToken(token);
  if (!payload) return null;

  const match = findById(payload.sub);
  if (!match) return null;

  return { user: match.user, token };
}
