import React from "react";
import logo from "./logo.svg";

const App = () => (
  <div className="text-center font-sans">
    <header className="flex flex-col justify-center items-center bg-gray-900 min-h-screen text-center">
      <img
        src={logo}
        className="make-it-spin pointer-events-none"
        style={{ height: "40vmin" }}
        alt="logo"
      />
      <p className="w-full md:text-3xl text-white">
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="text-blue-300 underline md:text-2xl mt-4 font-serif"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default App;
