import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockUser = {
  id: "1",
  firstName: "Alex",
  lastName: "Rodriguez",
  email: "alex@taskmanager.com",
  avatar: "https://example.com/avatar.jpg",
};

jest.mock("@/modules/auth/hooks/useAuth", () => ({
  useAuth: (selector: (state: Record<string, unknown>) => unknown) => {
    return selector({ user: mockUser });
  },
}));

describe("Header", () => {
  it("should render the user name", () => {
    render(<Header />);
    expect(screen.getByText("Alex Rodriguez")).toBeInTheDocument();
  });

  it("should render the user email", () => {
    render(<Header />);
    expect(screen.getByText("alex@taskmanager.com")).toBeInTheDocument();
  });

  it("should render the user avatar", () => {
    render(<Header />);
    const avatar = screen.getByAltText("Alex Rodriguez");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("should call onMenuClick when menu button is clicked", () => {
    const mockOnMenuClick = jest.fn();
    render(<Header onMenuClick={mockOnMenuClick} />);

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    expect(mockOnMenuClick).toHaveBeenCalled();
  });
});

