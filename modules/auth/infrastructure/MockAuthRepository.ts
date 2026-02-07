import { MockAccount, AuthRepository } from "../domain";

/** Predefined test accounts to simulate the authentication backend. */
const MOCK_USERS: MockAccount[] = [
  {
    user: {
      id: "1",
      firstName: "Alex",
      lastName: "Rodriguez",
      email: "alex@taskmanager.com",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    password: "password123",
  },
  {
    user: {
      id: "2",
      firstName: "Carlos",
      lastName: "Gutiérrez",
      email: "carlos@taskmanager.com",
      avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    },
    password: "password123",
  },
];

/**
 * Mock implementation of the authentication repository.
 * Looks up users in an in-memory array to simulate a real backend.
 */
export class MockAuthRepository implements AuthRepository {
  findByEmailAndPassword(email: string, password: string): MockAccount | undefined {
    return MOCK_USERS.find((u) => u.user.email === email && u.password === password);
  }

  findById(id: string): MockAccount | undefined {
    return MOCK_USERS.find((u) => u.user.id === id);
  }
}
