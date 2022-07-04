import { useMachine } from "@xstate/react";

import "./App.css";
import logo from "./logo.svg";
import { counterMachine, counterService } from "./machines/counterMachine";

function App() {
  const [state, send] = useMachine(counterMachine);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => send("INC")}>
            {state.context.count}
          </button>
          <button type="button" onClick={() => counterService.send("INC")}>
            Increase
          </button>
          <button type="button" onClick={() => counterService.send("DEC")}>
            Increase
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
