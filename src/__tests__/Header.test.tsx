import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: null,
    status: "unauthenticated",
  }),
}));

describe("Header", () => {
  it("renders the main navigation links", () => {
    render(<Header />);

    expect(screen.getByText("TAKE")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Talent")).toBeInTheDocument();
    expect(screen.getByText("Casting")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});