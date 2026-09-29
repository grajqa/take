import { render, screen } from "@testing-library/react";
import TalentCard from "@/components/TalentCard";

describe("TalentCard", () => {
  it("renders talent information correctly", () => {
    render(
      <TalentCard
        name="Vesa Grajçevci"
        category="Creative Director"
        location="Prishtina"
        experience="2 years"
      />
    );

    expect(screen.getByText("Vesa Grajçevci")).toBeInTheDocument();
    expect(screen.getByText("Creative Director")).toBeInTheDocument();
    expect(screen.getByText(/Prishtina/)).toBeInTheDocument();
    expect(screen.getByText("Experience: 2 years")).toBeInTheDocument();
  });
});