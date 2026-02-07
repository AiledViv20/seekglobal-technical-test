import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockLogin = jest.fn();
const mockGetState = jest.fn();

jest.mock("@/modules/auth/hooks/useAuth", () => ({
  useAuth: Object.assign(
    (selector?: (state: Record<string, unknown>) => unknown) => {
      const state = { login: mockLogin, isLoading: false };
      return selector ? selector(state) : state;
    },
    { getState: () => mockGetState() }
  ),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetState.mockReturnValue({ isAuthenticated: false });
  });

  it("should render the login form with email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeInTheDocument();
  });

  it("should render the welcome title", () => {
    render(<LoginForm />);

    expect(screen.getByText("Bienvenido")).toBeInTheDocument();
    expect(screen.getByText("Inicia sesión para gestionar tus tareas.")).toBeInTheDocument();
  });

  it("should show email validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "invalid-email");

    expect(screen.getByText("Ingresa un correo electrónico válido.")).toBeInTheDocument();
  });

  it("should show password validation error for short password", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText("Contraseña");
    await user.type(passwordInput, "ab");

    expect(screen.getByText("La contraseña debe tener al menos 3 caracteres.")).toBeInTheDocument();
  });

  it("should show password validation error when missing a number", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText("Contraseña");
    await user.type(passwordInput, "abcdef");

    expect(screen.getByText("La contraseña debe contener al menos un número.")).toBeInTheDocument();
  });

  it("should disable submit button when form is invalid", () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    expect(submitButton).toBeDisabled();
  });

  it("should enable submit button when form is valid", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "alex@taskmanager.com");
    await user.type(screen.getByLabelText("Contraseña"), "password123");

    const submitButton = screen.getByRole("button", { name: "Iniciar sesión" });
    expect(submitButton).toBeEnabled();
  });

  it("should call login and redirect on successful submit", async () => {
    mockLogin.mockResolvedValue(undefined);
    mockGetState.mockReturnValue({ isAuthenticated: true });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "alex@taskmanager.com");
    await user.type(screen.getByLabelText("Contraseña"), "password123");
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "alex@taskmanager.com",
        password: "password123",
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should not redirect when login fails", async () => {
    mockLogin.mockResolvedValue(undefined);
    mockGetState.mockReturnValue({ isAuthenticated: false });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "alex@taskmanager.com");
    await user.type(screen.getByLabelText("Contraseña"), "password123");
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should toggle password visibility", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText("Contraseña");
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByLabelText("Mostrar contraseña");
    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });
});
