/** Command that encapsulates the data needed to authenticate a user. */
export interface AuthCommand {
  email: string;
  password: string;
}
