import { assign, createMachine, interpret } from "@xstate/fsm";

type Ctx = {
  count: number;
};

const increment = (context: Ctx) => {
  return context.count + 1;
};

const decrement = (context: Ctx) => {
  return context.count - 1;
};

export const counterMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwAIBbAQ2QAsBLTMAOjO0oDcwBiASQDkBhRUAB1SxKjVJj4gAHogC0ARgBMABloBWAJyqFcpXIDsADgBsAFgWqANCACesueoO0DiuWYDMJ-RtUBfH1bQsXEJSCmo6BmY2ABEAUV4kEEFhUXFE6QR5ZTVNbV1DU3MrW0yFEyMnF3dPPW8-fxBMVAg4CUCcfGIyKhp6ZEYWCWSRSjEJDJk3HVo5VTl5gzdnPSNa4rsHSu1qr00-AIwOkO7woaERsfTZNw8ZuYWl-VXLG2v7Ldc9N00jc3U9eo+IA */
  createMachine(
    {
      context: { count: 0 },
      // @ts-expect-error ignore type from generation
      tsTypes: {} as import("./counterMachine.typegen").Typegen0,
      schema: {
        context: {} as Ctx,
        events: {} as
          | {
            type: "INC";
          }
          | { type: "DEC" },
      },
      id: "counter machine",
      initial: "active",
      states: {
        active: {
          on: {
            INC: {
              actions: "increase",
            },
            DEC: {
              actions: "decrement",
            },
          },
        },
      },
    },
    {
      actions: {
        increase: assign({ count: increment }),
        decrement: assign({ count: decrement }),
      },
    },
  );

export const counterService = interpret(counterMachine);

counterService.start();
