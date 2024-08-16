import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
  it("should not display an error on the machine after calling for help once", async () => {
    render(<RecyclingMachine />);

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("can", 10);

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toHaveTextContent(
      "Machine reached capacity, use the phone to call for help"
    );

    fireEvent.click(screen.getByTestId("phone"));

    await waitFor(
      () =>
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument(),
      { timeout: 4500 }
    );

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("bottle", 2);

    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("phone"));

    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
    expect(screen.getByTestId("counted-cans")).toHaveTextContent("10");
    expect(screen.getByTestId("counted-bottles")).toHaveTextContent("2");

    clickItems("bottle", 1);
    expect(screen.getByTestId("counted-bottles")).toHaveTextContent("3");
  });
  it("should not be possible to call if machine is working", () => {
    render(<RecyclingMachine />);
    const phoneCall = vi.fn();
    const playPhoneSound = vi.fn();

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("can", 5);
    clickItems("bottle", 1);

    fireEvent.click(screen.getByTestId("phone"));

    expect(phoneCall).not.toBeCalled();
    expect(playPhoneSound).not.toBeCalled();
  });

  it("should be possible to print a receipt and display correct values", () => {
    render(<RecyclingMachine />);

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("can", 5);
    clickItems("bottle", 1);

    expect(screen.queryByTestId("print-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("print-receipt"));

    expect(screen.getByTestId("receipt")).toBeInTheDocument();

    expect(screen.getByTestId("cans-amount")).toHaveTextContent("5");
    expect(screen.getByTestId("bottles-amount")).toHaveTextContent("1");
    expect(screen.getByTestId("value-amount")).toHaveTextContent("6");
  });
  it("should be possible to print a receipt and close it", () => {
    render(<RecyclingMachine />);

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("can", 5);
    clickItems("bottle", 1);

    expect(screen.queryByTestId("print-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("print-receipt"));

    expect(screen.getByTestId("receipt")).toBeInTheDocument();

    expect(screen.getByTestId("close-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-receipt"));

    expect(screen.queryByTestId("receipt")).not.toBeInTheDocument();
  });
  it("should be possible to print a receipt with either one can or bottle", () => {
    render(<RecyclingMachine />);

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("can", 1);
    clickItems("bottle", 0);

    expect(screen.queryByTestId("print-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("print-receipt"));

    expect(screen.getByTestId("receipt")).toBeInTheDocument();

    expect(screen.getByTestId("cans-amount")).toHaveTextContent("1");
    expect(screen.getByTestId("bottles-amount")).toHaveTextContent("0");
    expect(screen.getByTestId("value-amount")).toHaveTextContent("1");
    expect(screen.getByTestId("close-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-receipt"));

    expect(screen.queryByTestId("receipt")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("can", 0);
    clickItems("bottle", 1);

    expect(screen.queryByTestId("print-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("print-receipt"));

    expect(screen.getByTestId("receipt")).toBeInTheDocument();

    expect(screen.getByTestId("cans-amount")).toHaveTextContent("0");
    expect(screen.getByTestId("bottles-amount")).toHaveTextContent("1");
    expect(screen.getByTestId("value-amount")).toHaveTextContent("1");
  });
  it("should not be possible to print a receipt without starting or starting but with no cans/bottles", () => {
    render(<RecyclingMachine />);

    expect(screen.queryByTestId("print-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("print-receipt"));

    expect(screen.queryByTestId("receipt")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("screen"));

    expect(screen.queryByTestId("print-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("print-receipt"));

    expect(screen.queryByTestId("receipt")).not.toBeInTheDocument();
  });
  it("should be possible to print a receipt, call for help and then print a receipt", async () => {
    render(<RecyclingMachine />);

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("can", 0);
    clickItems("bottle", 1);

    expect(screen.queryByTestId("print-receipt")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("print-receipt"));

    expect(screen.queryByTestId("receipt")).toBeInTheDocument();
    expect(screen.queryByTestId("close-receipt"));

    fireEvent.click(screen.getByTestId("close-receipt"));
    expect(screen.queryByTestId("receipt")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("screen"));

    clickItems("can", 10);

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Machine reached capacity, use the phone to call for help"
    );

    fireEvent.click(screen.getByTestId("phone"));

    await waitFor(
      () =>
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument(),
      { timeout: 4500 }
    );

    fireEvent.click(screen.getByTestId("print-receipt"));

    expect(screen.queryByTestId("receipt")).toBeInTheDocument();
    expect(screen.queryByTestId("close-receipt"));

    fireEvent.click(screen.getByTestId("close-receipt"));
    expect(screen.queryByTestId("receipt")).not.toBeInTheDocument();
  });
});
