import { User } from "./Auth";

/** Structure of a decoded JWT token payload. */
export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Utility for generating and decoding simulated JWT tokens.
 * Uses base64 with a mock signature (non-cryptographic) to simulate the JWT flow.
 */
export class AuthToken {
  /**
   * Generates a simulated JWT token from user data.
   * @param user - Authenticated user.
   * @returns JWT token in header.payload.signature format.
   */
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

  /**
   * Decodes a JWT token and validates that it has not expired.
   * @param token - JWT token to decode.
   * @returns Decoded payload or null if the token is invalid/expired.
   */
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
