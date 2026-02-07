import { MockAccount, AuthRepository } from "../domain";

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

export class MockAuthRepository implements AuthRepository {
  findByEmailAndPassword(email: string, password: string): MockAccount | undefined {
    return MOCK_USERS.find((u) => u.user.email === email && u.password === password);
  }

  findById(id: string): MockAccount | undefined {
    return MOCK_USERS.find((u) => u.user.id === id);
  }
}
