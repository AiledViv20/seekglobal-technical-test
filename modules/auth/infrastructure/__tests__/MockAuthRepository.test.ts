import { MockAuthRepository } from "../MockAuthRepository";

describe("MockAuthRepository", () => {
  let repository: MockAuthRepository;

  beforeEach(() => {
    repository = new MockAuthRepository();
  });

  describe("findByEmailAndPassword", () => {
    it("should return an account for valid credentials (user 1)", () => {
      const result = repository.findByEmailAndPassword(
        "alex@taskmanager.com",
        "password123"
      );

      expect(result).toBeDefined();
      expect(result!.user.id).toBe("1");
      expect(result!.user.firstName).toBe("Alex");
      expect(result!.user.lastName).toBe("Rodriguez");
      expect(result!.user.email).toBe("alex@taskmanager.com");
    });

    it("should return an account for valid credentials (user 2)", () => {
      const result = repository.findByEmailAndPassword(
        "carlos@taskmanager.com",
        "password123"
      );

      expect(result).toBeDefined();
      expect(result!.user.id).toBe("2");
      expect(result!.user.firstName).toBe("Carlos");
    });

    it("should return undefined for wrong email", () => {
      const result = repository.findByEmailAndPassword(
        "wrong@email.com",
        "password123"
      );
      expect(result).toBeUndefined();
    });

    it("should return undefined for wrong password", () => {
      const result = repository.findByEmailAndPassword(
        "alex@taskmanager.com",
        "wrongpassword"
      );
      expect(result).toBeUndefined();
    });

    it("should return undefined for empty credentials", () => {
      const result = repository.findByEmailAndPassword("", "");
      expect(result).toBeUndefined();
    });
  });

  describe("findById", () => {
    it("should return an account for existing user id '1'", () => {
      const result = repository.findById("1");

      expect(result).toBeDefined();
      expect(result!.user.email).toBe("alex@taskmanager.com");
    });

    it("should return an account for existing user id '2'", () => {
      const result = repository.findById("2");

      expect(result).toBeDefined();
      expect(result!.user.email).toBe("carlos@taskmanager.com");
    });

    it("should return undefined for non-existing id", () => {
      const result = repository.findById("999");
      expect(result).toBeUndefined();
    });

    it("should return undefined for empty id", () => {
      const result = repository.findById("");
      expect(result).toBeUndefined();
    });
  });
});
