import { MockAccount } from "./Auth";

/**
 * Authentication repository contract.
 * Defines the operations needed to look up user accounts.
 */
export interface AuthRepository {
  /** Finds an account by email and password. */
  findByEmailAndPassword(email: string, password: string): MockAccount | undefined;
  /** Finds an account by user ID. */
  findById(id: string): MockAccount | undefined;
}
