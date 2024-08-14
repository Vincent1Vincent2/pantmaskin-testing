import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Screen from "./Screen";

describe("Screen", () => {
  it("displays 'Press screen to start' when not active", () => {
    const { getByTestId } = render(
      <Screen
        isActive={false}
        activate={() => {}}
        countedCans={0}
        countedBottles={0}
        value={0}
      />
    );
    expect(getByTestId("screen")).toHaveTextContent("Press screen to start");
  });

  it("calls activate function when clicked while not active", () => {
    const mockActivate = vi.fn();
    const { getByTestId } = render(
      <Screen
        isActive={false}
        activate={mockActivate}
        countedCans={0}
        countedBottles={0}
        value={0}
      />
    );
    fireEvent.click(getByTestId("screen"));
    expect(mockActivate).toHaveBeenCalled();
  });

  it("displays counts and value when active", () => {
    const { getByTestId } = render(
      <Screen
        isActive={true}
        activate={() => {}}
        countedCans={2}
        countedBottles={3}
        value={5}
      />
    );
    expect(getByTestId("counted-cans")).toHaveTextContent("2");
    expect(getByTestId("counted-bottles")).toHaveTextContent("3");
    expect(getByTestId("value")).toHaveTextContent("5");
  });
  it("should display a call for help message when the machine is full", () => {
    const { getByTestId } = render(
      <Screen
        isActive={true}
        activate={() => {}}
        countedCans={10}
        countedBottles={0}
        value={10}
      />
    );
    expect(getByTestId("counted-cans")).toHaveTextContent("10");
    expect(getByTestId("counted-bottles")).toHaveTextContent("0");
    expect(getByTestId("value")).toHaveTextContent("10");

    expect(screen.getByTestId("screen")).toHaveTextContent(
      "Machine reached capacity, use the phone to call for help"
    );
  });
});
