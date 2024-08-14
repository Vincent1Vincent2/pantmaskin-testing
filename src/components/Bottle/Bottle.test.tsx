import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../App";

describe("Bottle", () => {
  it("should be visible", () => {
    render(<App />);

    expect(screen.getAllByTestId("bottle")).toBeVisible();
  });
});
