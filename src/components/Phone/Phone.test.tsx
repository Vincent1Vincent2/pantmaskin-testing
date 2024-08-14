import { fireEvent, render, screen } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";
import Screen from "../RecyclingMachine/Screen/Screen";
import Phone from "./Phone";

describe("Phone", () => {
  it("should not be able to call for help if machine is working", () => {
    const phoneCall = vi.fn();

    render(
      <>
        <Screen
          isActive={true}
          activate={() => {}}
          countedCans={10}
          countedBottles={0}
          value={10}
          errorMessage="Machine reached capacity, use the phone to call for help"
        />
        <Phone isActive={true} onClick={phoneCall} />
      </>
    );

    expect(screen.getByTestId("phone")).toBeVisible();

    fireEvent.click(screen.getByTestId("phone"));

    expect(phoneCall).not.toBeCalled();
  });
  it("should be possible to call for help if machine is not working", () => {
    const phoneCall = vi.fn();

    render(
      <>
        {" "}
        <Screen
          isActive={null}
          activate={() => {}}
          countedCans={10}
          countedBottles={0}
          value={10}
          errorMessage="Machine reached capacity, use the phone to call for help"
        />{" "}
        <Phone isActive={null} onClick={phoneCall} />
      </>
    );

    expect(screen.getByTestId("phone")).toBeVisible();

    expect(screen.getByTestId("screen")).toHaveTextContent(
      "Machine reached capacity, use the phone to call for help"
    );

    fireEvent.click(screen.getByTestId("phone"));
    expect(phoneCall).toBeCalled();
  });
});
