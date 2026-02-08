/** Credentials submitted by the user in the login form. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Public data of the authenticated user. */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

/** Mock account that associates a user with their password (mock only). */
export interface MockAccount {
  user: User;
  password: string;
}

/** Response returned by the authentication flow after a successful login. */
export interface AuthResponse {
  user: User;
  token: string;
}
