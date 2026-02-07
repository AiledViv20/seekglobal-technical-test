import { AuthResponse, AuthRepository, AuthToken } from "../domain";
import { AuthCommand } from "./AuthCommand";

const SIMULATED_DELAY = 800;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

export class Authenticator {
  constructor(private repository: AuthRepository) {}

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

  validateToken(token: string): AuthResponse | null {
    const payload = AuthToken.decode(token);
    if (!payload) return null;

    const match = this.repository.findById(payload.sub);
    if (!match) return null;

    return { user: match.user, token };
  }
}
