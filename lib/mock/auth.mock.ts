import { MockAccount, User } from "@/lib/types/auth.types";

export const MOCK_USERS: MockAccount[] = [
  {
    user: {
      id: "1",
      firstName: "Alex",
      lastName: "Rodriguez",
      email: "alex@taskmanager.com",
    },
    password: "password123",
  },
  {
    user: {
      id: "2",
      firstName: "Carlos",
      lastName: "Gutiérrez",
      email: "carlos@taskmanager.com",
    },
    password: "password123",
  },
];

/**
 * Genera un token JWT simulado con payload en base64.
 */
export function generateMockToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
    })
  );
  const signature = btoa("mock-signature");

  return `${header}.${payload}.${signature}`;
}

/**
 * Decodifica el payload de un token JWT simulado.
 */
export function decodeMockToken(token: string): { sub: string; name: string; email: string; exp: number } | null {
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
