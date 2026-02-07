import { MockAccount, AuthRepository } from "../domain";

const MOCK_USERS: MockAccount[] = [
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

export class MockAuthRepository implements AuthRepository {
  findByEmailAndPassword(email: string, password: string): MockAccount | undefined {
    return MOCK_USERS.find((u) => u.user.email === email && u.password === password);
  }

  findById(id: string): MockAccount | undefined {
    return MOCK_USERS.find((u) => u.user.id === id);
  }
}
