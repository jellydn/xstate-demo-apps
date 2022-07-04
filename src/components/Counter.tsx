import { useMachine } from "@xstate/react";

import { counterMachine, counterService } from "../machines/counterMachine";

export function Counter() {
  const [state, send] = useMachine(counterMachine);
  return (
    <p>
      <span>Counter</span>
      <button type="button" onClick={() => send("INC")}>
        {state.context.count}
      </button>
      <button type="button" onClick={() => counterService.send("INC")}>
        Increase
      </button>
      <button type="button" onClick={() => counterService.send("DEC")}>
        Decrease
      </button>
    </p>
  );
}
