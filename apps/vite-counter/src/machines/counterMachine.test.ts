import { act, renderHook } from "@testing-library/react-hooks";
import { useMachine } from "@xstate/react";

import { counterMachine } from "./counterMachine";

describe("counterMachine", () => {
  it("should increment counter", () => {
    const { result } = renderHook(() => useMachine(counterMachine));
    act(() => {
      result.current[1]("INC");
    });
    expect(result.current[0].context.count).toBe(1);
  });
  it("should decrease counter", () => {
    const { result } = renderHook(() => useMachine(counterMachine));
    act(() => {
      result.current[1]("DEC");
    });
    expect(result.current[0].context.count).toBe(-1);
  });
});
