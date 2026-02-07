export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MockAccount {
  user: User;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
