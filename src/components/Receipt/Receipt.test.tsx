import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Receipt from "./Receipt";

describe("Receipt", () => {
  it("should render with correct values", () => {
    const closeReceipt = vi.fn();

    render(
      <Receipt cans={5} bottles={5} value={10} closeReceipt={closeReceipt} />
    );
    expect(screen.getByTestId("cans-amount")).toHaveTextContent("5");
    expect(screen.getByTestId("bottles-amount")).toHaveTextContent("5");
    expect(screen.getByTestId("value-amount")).toHaveTextContent("10");
  });

  it("should call closeReceipt function", () => {
    const closeReceipt = vi.fn();

    render(
      <Receipt cans={5} bottles={5} value={10} closeReceipt={closeReceipt} />
    );
    expect(screen.getByTestId("close-receipt")).toHaveTextContent("X");

    fireEvent.click(screen.getByTestId("close-receipt"));

    expect(closeReceipt).toBeCalled();
  });
});
