import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../App";

export const seenItems = (itemType: "can" | "bottle", count: number) => {
  for (let i = 1; i <= count; i++) {
    expect(screen.getByTestId(`${itemType}-${i}`)).toBeVisible();
  }
};

describe("Can", () => {
  it("should be visible", () => {
    render(<App />);

    seenItems("can", 4);
  });
});
