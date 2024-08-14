import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Can from "./Can";

export const seenItems = (itemType: "can" | "bottle", count: number) => {
  const elements = screen.getAllByTestId(new RegExp(`^${itemType}-`));
  for (let i = 0; i < count && i < elements.length; i++) {
    expect(elements[i]).toBeVisible();
  }
};

describe("Can", () => {
  it("should be visible and handle clicks", () => {
    const handleItemClick = vi.fn();
    const clicked: number[] = [];

    const { getAllByTestId } = render(
      <Can hideClicked={clicked} handleItemClick={handleItemClick} />
    );

    seenItems("can", 3);

    const canImages = getAllByTestId(/^can-/);

    canImages.forEach((can) => {
      fireEvent.click(can);
      expect(handleItemClick).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Number),
        expect.any(Number)
      );
    });

    expect(handleItemClick).toHaveBeenCalledTimes(canImages.length);
  });
});
