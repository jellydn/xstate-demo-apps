import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "../utils/test-utils";
import { Counter } from "./Counter";

describe("Counter", async () => {
  it("should render the counter", () => {
    render(<Counter />);
    expect(screen.getByText("Counter")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /increase/i,
      })
    ).toBeInTheDocument();
  });

  it("should increase the counter", async () => {
    render(<Counter />);

    screen.logTestingPlaygroundURL();

    const btn = screen.getByRole("button", {
      name: /0/i,
    });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("0");

    userEvent.click(btn);

    await waitForElementToBeRemoved(() =>
      screen.getByRole("button", {
        name: /0/i,
      })
    );

    expect(btn).toHaveTextContent("1");
  });
});
