import { AuthResponse, AuthRepository, AuthToken } from "../domain";
import { AuthCommand } from "./AuthCommand";

/** Simulated delay to emulate network latency (ms). */
const SIMULATED_DELAY = 800;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

/**
 * Main authentication use case.
 * Handles login with credentials and validation of existing tokens.
 */
export class Authenticator {
  constructor(private repository: AuthRepository) {}

  /**
   * Authenticates a user with email and password.
   * @param command - User credentials.
   * @returns Authenticated user along with their JWT token.
   * @throws Error if credentials are invalid.
   */
  async login(command: AuthCommand): Promise<AuthResponse> {
    await delay();

    const match = this.repository.findByEmailAndPassword(command.email, command.password);

    if (!match) {
      throw new Error(
        "Las credenciales no son correctas. Asegúrate de que tu correo y contraseña estén bien escritos."
      );
    }

    const token = AuthToken.generate(match.user);

    return { user: match.user, token };
  }

  /**
   * Validates an existing JWT token and retrieves the associated user.
   * @param token - JWT token stored in localStorage.
   * @returns User and token if valid, null if expired or user does not exist.
   */
  validateToken(token: string): AuthResponse | null {
    const payload = AuthToken.decode(token);
    if (!payload) return null;

    const match = this.repository.findById(payload.sub);
    if (!match) return null;

    return { user: match.user, token };
  }
}
