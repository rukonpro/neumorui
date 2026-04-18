import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeatherCard } from "./WeatherCard";

describe("WeatherCard", () => {
  it("renders location and temperature", () => {
    render(<WeatherCard location="Dhaka" temperature={32} condition="Sunny" />);
    expect(screen.getByText("Dhaka")).toBeInTheDocument();
    expect(screen.getByText("32")).toBeInTheDocument();
  });

  it("renders condition", () => {
    render(<WeatherCard location="NY" temperature={20} condition="Cloudy" />);
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
  });

  it("renders forecast days", () => {
    render(
      <WeatherCard
        location="X"
        temperature={25}
        condition="Y"
        forecast={[
          { day: "Mon", icon: "☀️", high: 30, low: 22 },
          { day: "Tue", icon: "🌧️", high: 28, low: 20 },
        ]}
      />
    );
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
  });
});
