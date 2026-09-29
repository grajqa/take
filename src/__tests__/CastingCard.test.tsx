import { render, screen } from "@testing-library/react";
import CastingCard from "@/components/CastingCard";

describe("CastingCard", () => {
  it("renders casting information correctly", () => {
    render(
      <CastingCard
        category="Fashion"
        title="Fashion Campaign"
        description="Looking for talent for a fashion campaign."
        location="Prishtina"
        compensation="Paid opportunity"
        deadline="October 5, 2026"
        href="/casting/123"
      />
    );

    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("Fashion Campaign")).toBeInTheDocument();
    expect(
      screen.getByText("Looking for talent for a fashion campaign.")
    ).toBeInTheDocument();
    expect(screen.getByText(/Prishtina/)).toBeInTheDocument();
    expect(screen.getByText(/Paid opportunity/)).toBeInTheDocument();
    expect(screen.getByText(/October 5, 2026/)).toBeInTheDocument();
  });
});