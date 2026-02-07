import { Authenticator } from "../Authenticator";
import { MockAuthRepository } from "../../infrastructure/MockAuthRepository";
import { AuthToken } from "../../domain/AuthToken";

jest.useFakeTimers();

describe("Authenticator", () => {
  let authenticator: Authenticator;
  let repository: MockAuthRepository;

  beforeEach(() => {
    repository = new MockAuthRepository();
    authenticator = new Authenticator(repository);
  });

  describe("login", () => {
    it("should return user and token for valid credentials", async () => {
      const loginPromise = authenticator.login({
        email: "alex@taskmanager.com",
        password: "password123",
      });

      jest.advanceTimersByTime(800);

      const result = await loginPromise;

      expect(result.user).toBeDefined();
      expect(result.user.id).toBe("1");
      expect(result.user.email).toBe("alex@taskmanager.com");
      expect(result.token).toBeDefined();
      expect(result.token.split(".")).toHaveLength(3);
    });

    it("should generate a valid JWT token on login", async () => {
      const loginPromise = authenticator.login({
        email: "alex@taskmanager.com",
        password: "password123",
      });

      jest.advanceTimersByTime(800);
      const result = await loginPromise;

      const decoded = AuthToken.decode(result.token);
      expect(decoded).not.toBeNull();
      expect(decoded!.sub).toBe("1");
      expect(decoded!.email).toBe("alex@taskmanager.com");
    });

    it("should throw an error for invalid credentials", async () => {
      const loginPromise = authenticator.login({
        email: "wrong@email.com",
        password: "wrongpassword",
      });

      jest.advanceTimersByTime(800);

      await expect(loginPromise).rejects.toThrow(
        "Las credenciales no son correctas"
      );
    });

    it("should throw an error for correct email but wrong password", async () => {
      const loginPromise = authenticator.login({
        email: "alex@taskmanager.com",
        password: "wrongpassword",
      });

      jest.advanceTimersByTime(800);

      await expect(loginPromise).rejects.toThrow();
    });
  });

  describe("validateToken", () => {
    it("should return user and token for a valid token", async () => {
      const loginPromise = authenticator.login({
        email: "alex@taskmanager.com",
        password: "password123",
      });

      jest.advanceTimersByTime(800);
      const loginResult = await loginPromise;

      const validateResult = authenticator.validateToken(loginResult.token);

      expect(validateResult).not.toBeNull();
      expect(validateResult!.user.id).toBe("1");
      expect(validateResult!.token).toBe(loginResult.token);
    });

    it("should return null for an expired token", () => {
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          sub: "1",
          name: "Alex Rodriguez",
          email: "alex@taskmanager.com",
          iat: Date.now() - 48 * 60 * 60 * 1000,
          exp: Date.now() - 24 * 60 * 60 * 1000,
        })
      );
      const expiredToken = `${header}.${payload}.${btoa("mock-signature")}`;

      const result = authenticator.validateToken(expiredToken);
      expect(result).toBeNull();
    });

    it("should return null for a token with non-existing user", () => {
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          sub: "999",
          name: "Unknown",
          email: "unknown@test.com",
          iat: Date.now(),
          exp: Date.now() + 24 * 60 * 60 * 1000,
        })
      );
      const token = `${header}.${payload}.${btoa("mock-signature")}`;

      const result = authenticator.validateToken(token);
      expect(result).toBeNull();
    });

    it("should return null for an invalid token string", () => {
      const result = authenticator.validateToken("invalid-token");
      expect(result).toBeNull();
    });
  });
});
