import { describe, expect, vi } from "vitest";
import { counterMachine, counterService } from "./counterMachine";

describe("counterMachine", () => {
  it("should increment counter", () => {
    const result = counterMachine.transition(
      counterMachine.initialState,
      "INC",
    );
    expect(result.context.count).toBe(1);
    expect(result).toMatchSnapshot();
  });
  it("should decrease counter", () => {
    const result = counterMachine.transition(
      counterMachine.initialState,
      "DEC",
    );
    expect(result.context.count).toBe(-1);
    expect(result).toMatchSnapshot();
  });
});

describe("counterService", () => {
  it("should increment counter", () => {
    const fn = vi.fn();

    counterService.subscribe(fn);
    counterService.send("INC");
    counterService.send("INC");

    expect(counterService.state).toMatchSnapshot();
    expect(counterService.state.context.count).toBe(2);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("should decrease counter", () => {
    const fn = vi.fn();
    counterService.subscribe(fn);
    counterService.send("DEC");

    expect(counterService.state).toMatchSnapshot();
    expect(counterService.state.context.count).toBe(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
