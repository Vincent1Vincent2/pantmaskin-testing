import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../../App";

const clickItems = (itemType: "can" | "bottle", count: number) => {
  for (let i = 1; i <= count; i++) {
    fireEvent.click(screen.getByTestId(`${itemType}-${i}`));
  }
};

describe("Screen", () => {
  it("should display start message", () => {
    render(<App />);

    expect(screen.queryByTestId("screen")).toHaveTextContent(
      "Press screen to start"
    );
  });
  it("should not be possible to start without pressing the screen", () => {
    render(<App />);

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
    render(<App />);

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
    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("3");

    clickItems("bottle", 2);
    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("3");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("3");
  });
  it("should increment the value when a can or bottle has been pressed", () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("screen"));

    expect(screen.queryByTestId("value")).toHaveTextContent("0");
    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("0");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("0");

    clickItems("can", 1);
    clickItems("bottle", 1);

    expect(screen.queryByTestId("value")).toHaveTextContent("2");
    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("1");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("1");

    clickItems("can", 1);
    clickItems("bottle", 1);
    clickItems("can", 1);
    clickItems("bottle", 1);

    expect(screen.queryByTestId("value")).toHaveTextContent("6");
    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("3");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("3");

    clickItems("can", 1);

    expect(screen.queryByTestId("value")).toHaveTextContent("7");
    expect(screen.queryByTestId("counted-cans")).toHaveTextContent("4");
    expect(screen.queryByTestId("counted-bottles")).toHaveTextContent("3");
  });
});
