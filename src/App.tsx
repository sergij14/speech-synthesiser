import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (window.speechSynthesis) {
      synth.current = window.speechSynthesis;
    }
  }, []);

  const speak = () => {
    synth.current?.speak(new SpeechSynthesisUtterance("hello"));
  };

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={speak}>Speak</button>
      </div>
    </div>
  );
}

export default App;
