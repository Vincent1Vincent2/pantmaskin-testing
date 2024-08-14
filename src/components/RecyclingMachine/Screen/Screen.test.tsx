import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../../App";

describe("Screen", () => {
  it("should display start message", () => {
    render(<App />);

    expect(screen.findByTestId("screen")).toHaveTextContent(
      "Press screen to start"
    );
  });
  it("should not be possible to start without pressing the screen", () => {
    render(<App />);

    expect(screen.findByTestId("screen")).toHaveTextContent(
      "Press screen to start"
    );

    expect(screen.queryByTestId("counted-cans")).not.toBeInTheDocument();
    expect(screen.queryByTestId("counted-bottles")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("can"));
    fireEvent.click(screen.getByTestId("bottle"));

    expect(screen.findByTestId("screen")).toHaveTextContent(
      "Press screen to start"
    );

    expect(screen.queryByTestId("counted-cans")).not.toBeInTheDocument();
    expect(screen.queryByTestId("counted-bottles")).not.toBeInTheDocument();
  });
  it("should increment the corresponding type, either can or bottle", () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("screen"));

    expect(screen.findByTestId("counted-cans")).toHaveTextContent("0");
    expect(screen.findByTestId("counted-bottles")).toHaveTextContent("0");

    fireEvent.click(screen.getByTestId("can"));
    expect(screen.findByTestId("counted-cans")).toHaveTextContent("1");
    expect(screen.findByTestId("counted-bottles")).toHaveTextContent("0");

    fireEvent.click(screen.getByTestId("bottle"));
    expect(screen.findByTestId("counted-cans")).toHaveTextContent("1");
    expect(screen.findByTestId("counted-bottles")).toHaveTextContent("0");

    fireEvent.click(screen.getByTestId("can"));
    fireEvent.click(screen.getByTestId("can"));
    expect(screen.findByTestId("counted-cans")).toHaveTextContent("3");

    fireEvent.click(screen.getByTestId("bottle"));
    fireEvent.click(screen.getByTestId("bottle"));
    expect(screen.findByTestId("counted-cans")).toHaveTextContent("3");
    expect(screen.findByTestId("counted-bottles")).toHaveTextContent("3");
  });
  it("should increment the value when a can or bottle has been pressed", () => {
    render(<App />);

    expect(screen.findByTestId("value")).toHaveTextContent("0");
    expect(screen.findByTestId("counted-cans")).toHaveTextContent("0");
    expect(screen.findByTestId("counted-bottles")).toHaveTextContent("0");

    fireEvent.click(screen.getByTestId("can"));
    fireEvent.click(screen.getByTestId("bottle"));

    expect(screen.findByTestId("value")).toHaveTextContent("1");
    expect(screen.findByTestId("counted-cans")).toHaveTextContent("1");
    expect(screen.findByTestId("counted-bottles")).toHaveTextContent("1");

    fireEvent.click(screen.getByTestId("can"));
    fireEvent.click(screen.getByTestId("bottle"));
    fireEvent.click(screen.getByTestId("can"));
    fireEvent.click(screen.getByTestId("bottle"));

    expect(screen.findByTestId("value")).toHaveTextContent("6");
    expect(screen.findByTestId("counted-cans")).toHaveTextContent("3");
    expect(screen.findByTestId("counted-bottles")).toHaveTextContent("3");

    fireEvent.click(screen.getByTestId("can"));

    expect(screen.findByTestId("value")).toHaveTextContent("7");
    expect(screen.findByTestId("counted-cans")).toHaveTextContent("4");
    expect(screen.findByTestId("counted-bottles")).toHaveTextContent("3");
  });
});
