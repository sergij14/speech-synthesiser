import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const synth = useRef<SpeechSynthesis | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (window.speechSynthesis) {
      synth.current = window.speechSynthesis;
    }
  }, []);

  const speak = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    synth.current?.speak(new SpeechSynthesisUtterance(text));
    setText('')
  };

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Speech Synthesieser</h1>
      <div className="card">
        <form onSubmit={speak}>
          <input value={text} type="text" onChange={({ target }) => setText(target.value)} />
          <button disabled={!text.length} type="submit">Speak</button>
        </form>
      </div>
    </div>
  );
}

export default App;
