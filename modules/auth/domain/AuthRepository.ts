import { MockAccount } from "./Auth";

export interface AuthRepository {
  findByEmailAndPassword(email: string, password: string): MockAccount | undefined;
  findById(id: string): MockAccount | undefined;
}
