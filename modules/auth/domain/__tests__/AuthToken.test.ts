import { AuthToken } from "../AuthToken";
import { User } from "../Auth";

const mockUser: User = {
  id: "1",
  firstName: "Alex",
  lastName: "Rodriguez",
  email: "alex@taskmanager.com",
  avatar: "https://example.com/avatar.jpg",
};

describe("AuthToken", () => {
  describe("generate", () => {
    it("should return a token with three parts separated by dots", () => {
      const token = AuthToken.generate(mockUser);
      const parts = token.split(".");
      expect(parts).toHaveLength(3);
    });

    it("should include user data in the payload", () => {
      const token = AuthToken.generate(mockUser);
      const payload = JSON.parse(atob(token.split(".")[1]));

      expect(payload.sub).toBe(mockUser.id);
      expect(payload.name).toBe(`${mockUser.firstName} ${mockUser.lastName}`);
      expect(payload.email).toBe(mockUser.email);
    });

    it("should set expiration to 24 hours from now", () => {
      const before = Date.now();
      const token = AuthToken.generate(mockUser);
      const after = Date.now();

      const payload = JSON.parse(atob(token.split(".")[1]));
      const twentyFourHours = 24 * 60 * 60 * 1000;

      expect(payload.exp).toBeGreaterThanOrEqual(before + twentyFourHours);
      expect(payload.exp).toBeLessThanOrEqual(after + twentyFourHours);
    });

    it("should include iat (issued at) timestamp", () => {
      const before = Date.now();
      const token = AuthToken.generate(mockUser);
      const after = Date.now();

      const payload = JSON.parse(atob(token.split(".")[1]));
      expect(payload.iat).toBeGreaterThanOrEqual(before);
      expect(payload.iat).toBeLessThanOrEqual(after);
    });

    it("should include a valid header with HS256 algorithm", () => {
      const token = AuthToken.generate(mockUser);
      const header = JSON.parse(atob(token.split(".")[0]));

      expect(header.alg).toBe("HS256");
      expect(header.typ).toBe("JWT");
    });
  });

  describe("decode", () => {
    it("should decode a valid token and return the payload", () => {
      const token = AuthToken.generate(mockUser);
      const payload = AuthToken.decode(token);

      expect(payload).not.toBeNull();
      expect(payload!.sub).toBe(mockUser.id);
      expect(payload!.email).toBe(mockUser.email);
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
      const signature = btoa("mock-signature");
      const expiredToken = `${header}.${payload}.${signature}`;

      expect(AuthToken.decode(expiredToken)).toBeNull();
    });

    it("should return null for a token with invalid format", () => {
      expect(AuthToken.decode("invalid-token")).toBeNull();
    });

    it("should return null for a token with only two parts", () => {
      expect(AuthToken.decode("part1.part2")).toBeNull();
    });

    it("should return null for a token with invalid base64 payload", () => {
      expect(AuthToken.decode("valid.!!!invalid!!!.valid")).toBeNull();
    });

    it("should return null for an empty string", () => {
      expect(AuthToken.decode("")).toBeNull();
    });
  });
});
