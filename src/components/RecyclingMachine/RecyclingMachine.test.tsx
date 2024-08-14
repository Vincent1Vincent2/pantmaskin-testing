import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { seenItems } from "../Can/Can.test";
import RecyclingMachine from "./RecyclingMachine";

const clickItems = (itemType: "can" | "bottle", count: number) => {
  const elements = screen.getAllByTestId(new RegExp(`^${itemType}-`));
  for (let i = 0; i < count && i < elements.length; i++) {
    fireEvent.click(elements[i]);
  }
};

describe("RecyclingMachine", () => {
  it("should be visible", () => {
    render(<RecyclingMachine />);
    expect(screen.queryByTestId("recycling-machine")).toBeVisible();
  });

  it("should activate the machine when handleActivation is called", () => {
    render(<RecyclingMachine />);
    expect(screen.queryByTestId("screen")).toHaveTextContent(
      "Press screen to start"
    );
    fireEvent.click(screen.getByTestId("screen"));

    expect(screen.queryByTestId("screen")).not.toHaveTextContent(
      "Press screen to start"
    );
  });

  it("should not be possible to start without pressing the screen", () => {
    render(<RecyclingMachine />);

    expect(screen.queryByTestId("screen")).toHaveTextContent(
      "Press screen to start"
    );

    expect(screen.queryByTestId("counted-cans")).not.toBeInTheDocument();
    expect(screen.queryByTestId("counted-bottles")).not.toBeInTheDocument();

    clickItems("can", 1);
    clickItems("bottle", 1);

    expect(screen.queryByTestId("screen")).toHaveTextContent(
      "Press screen to start"
    );
    expect(screen.queryByTestId("counted-cans")).not.toBeInTheDocument();
    expect(screen.queryByTestId("counted-bottles")).not.toBeInTheDocument();
  });
  it("should increment the corresponding type, either can or bottle", () => {
    render(<RecyclingMachine />);
    fireEvent.click(screen.getByTestId("screen"));

    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("0");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("0");

    clickItems("can", 1);

    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("1");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("0");
    clickItems("bottle", 1);

    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("1");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("1");
    clickItems("can", 2);
    clickItems("bottle", 2);

    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("3");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("3");
  });

  it("should increment the value when a can or bottle has been pressed", () => {
    render(<RecyclingMachine />);
    fireEvent.click(screen.getByTestId("screen"));
    expect(screen.queryByTestId("value")).toHaveTextContent("0");
    clickItems("can", 1);
    clickItems("bottle", 1);
    expect(screen.queryByTestId("value")).toHaveTextContent("2");
    clickItems("can", 2);
    clickItems("bottle", 2);
    expect(screen.queryByTestId("value")).toHaveTextContent("6");
    clickItems("can", 1);
    expect(screen.queryByTestId("value")).toHaveTextContent("7");
  });
  it("should display error message when limit of machine is reached ", () => {
    render(<RecyclingMachine />);
    fireEvent.click(screen.getByTestId("screen"));

    expect(screen.queryByTestId("value")).toHaveTextContent("0");
    clickItems("can", 10);

    expect(screen.queryByTestId("error-message")).toHaveTextContent(
      "Machine reached capacity, use the phone to call for help"
    );
  });
  it("should not be possible to click and recycle cans/bottles when error message is displayed", () => {
    render(<RecyclingMachine />);

    fireEvent.click(screen.getByTestId("screen"));

    expect(screen.queryByTestId("value")).toHaveTextContent("0");
    clickItems("can", 10);

    expect(screen.queryByTestId("error-message")).toHaveTextContent(
      "Machine reached capacity, use the phone to call for help"
    );

    clickItems("bottle", 3);

    seenItems("bottle", 3);
  });
  it("should be possible to call for help when error message is displayed", async () => {
    render(<RecyclingMachine />);

    fireEvent.click(screen.getByTestId("screen"));

    expect(screen.queryByTestId("value")).toHaveTextContent("0");
    clickItems("can", 10);

    expect(screen.queryByTestId("error-message")).toHaveTextContent(
      "Machine reached capacity, use the phone to call for help"
    );

    fireEvent.click(screen.getByTestId("phone"));

    await waitFor(
      () =>
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument(),
      { timeout: 4500 }
    );
  });
});
