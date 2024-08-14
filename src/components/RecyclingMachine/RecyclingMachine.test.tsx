import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../App";

describe("Recycling Machine", () => {
  it("should be visible", () => {
    render(<App />);

    expect(screen.queryByTestId("recycling-machine")).toBeVisible();
  });
});
