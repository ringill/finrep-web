import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface IZ<Type> {
  url: string;
  z: number;
}

const z = {
  a: "1",
  b: "2"
};

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <p>Greetings, traveler! Sign up today!</p>
      </div>

      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
