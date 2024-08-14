import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the heading and RecyclingMachine", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "RECYCLING RECYCLING!"
    );

    expect(screen.getByTestId("recycling-machine")).toBeInTheDocument();
  });
});
