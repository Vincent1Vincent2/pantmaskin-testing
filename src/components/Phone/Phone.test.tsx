import { fireEvent, render, screen } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";
import Screen from "../RecyclingMachine/Screen/Screen";
import Phone from "./Phone";

describe("Phone", () => {
  it("should render", () => {
    const phoneCall = vi.fn();

    render(<Phone timesFixed={0} isActive={true} onClick={phoneCall} />);

    expect(screen.getByTestId("phone")).toBeVisible();
  });
  it("should be possible to call for help if machine is not working", () => {
    const phoneCall = vi.fn();

    render(
      <>
        <Screen
          isActive={null}
          activate={() => {}}
          countedCans={10}
          countedBottles={0}
          value={10}
          errorMessage="Machine reached capacity, use the phone to call for help"
        />
        <Phone timesFixed={0} isActive={null} onClick={phoneCall} />
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
