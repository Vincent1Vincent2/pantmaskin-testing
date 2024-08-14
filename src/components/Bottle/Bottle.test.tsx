import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "../../App";
import { seenItems } from "../Can/Can.test";

describe("Bottle", () => {
  it("should be visible", () => {
    render(<App />);

    seenItems("bottle", 3);
  });
});
