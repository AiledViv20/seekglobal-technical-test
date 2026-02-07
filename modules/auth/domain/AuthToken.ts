import { User } from "./Auth";

export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export class AuthToken {
  static generate(user: User): string {
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

  static decode(token: string): TokenPayload | null {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;

      const payload: TokenPayload = JSON.parse(atob(parts[1]));
      if (payload.exp < Date.now()) return null;

      return payload;
    } catch {
      return null;
    }
  }
}
