import React from "react";
import "./App.css";
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header"></header>

        <Dictionary />
        <p className="footer">
          <a
            href="https://github.com/biotech-Dlvr/project-dictionary"
            target="_blank"
            rel="noreferrer"
          >
            GitHub repository
          </a>
          by Azar Delavari
        </p>
      </div>
    </div>
  );
}
export default App;
