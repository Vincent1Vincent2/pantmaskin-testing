import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Can from "./Can";

export const seenItems = (itemType: "can" | "bottle", count: number) => {
  for (let i = 1; i <= count; i++) {
    expect(screen.getByTestId(`${itemType}-${i}`)).toBeVisible();
  }
};

describe("Can", () => {
  it("should be visible and handle clicks", () => {
    const handleItemClick = vi.fn();

    const { getAllByTestId } = render(
      <Can handleItemClick={handleItemClick} />
    );

    seenItems("can", 3);

    const canImages = getAllByTestId(/^can-/);

    canImages.forEach((can) => {
      fireEvent.click(can);
      expect(handleItemClick).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Number)
      );
    });

    expect(handleItemClick).toHaveBeenCalledTimes(canImages.length);
  });
});
