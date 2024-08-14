import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { seenItems } from "../Can/Can.test";
import Bottle from "./Bottle";

describe("Bottle", () => {
  it("should be visible and handle clicks", () => {
    const handleItemClick = vi.fn();

    const { getAllByTestId } = render(
      <Bottle handleItemClick={handleItemClick} />
    );

    seenItems("bottle", 3);

    const bottleImages = getAllByTestId(/^bottle-/);

    bottleImages.forEach((bottle) => {
      fireEvent.click(bottle);
      expect(handleItemClick).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Number)
      );
    });

    expect(handleItemClick).toHaveBeenCalledTimes(bottleImages.length);
  });
});
