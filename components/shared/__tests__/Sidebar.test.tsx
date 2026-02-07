import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockLogout = jest.fn();
jest.mock("@/modules/auth/hooks/useAuth", () => ({
  useAuth: (selector: (state: Record<string, unknown>) => unknown) => {
    return selector({ logout: mockLogout });
  },
}));

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the logo", () => {
    render(<Sidebar />);
    expect(screen.getByAltText("SEEK")).toBeInTheDocument();
  });

  it("should render the Dashboard link", () => {
    render(<Sidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should render the logout button", () => {
    render(<Sidebar />);
    expect(screen.getByText("Salir")).toBeInTheDocument();
  });

  it("should call logout and redirect when clicking Salir", () => {
    render(<Sidebar />);

    fireEvent.click(screen.getByText("Salir"));

    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should have the dashboard link pointing to /dashboard", () => {
    render(<Sidebar />);
    const link = screen.getByText("Dashboard").closest("a");
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("should call onClose when clicking a nav link", () => {
    const mockOnClose = jest.fn();
    render(<Sidebar isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Dashboard"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should render overlay when isOpen is true", () => {
    const mockOnClose = jest.fn();
    render(<Sidebar isOpen={true} onClose={mockOnClose} />);

    // The overlay is the div with onClick={onClose} and bg-black/50 class
    const overlay = document.querySelector(".fixed.inset-0.bg-black\\/50");
    expect(overlay).toBeInTheDocument();
  });

  it("should not render overlay when isOpen is false", () => {
    render(<Sidebar isOpen={false} />);

    const overlay = document.querySelector(".fixed.inset-0.bg-black\\/50");
    expect(overlay).not.toBeInTheDocument();
  });
});
