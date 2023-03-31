import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const VoiceSelect = ({ voices }: { voices?: SpeechSynthesisVoice[] }) => (
  <select>
    {(voices || []).map((voice) => (
      <option key={voice.voiceURI} value={voice.name}>
        {voice.name}
      </option>
    ))}
  </select>
);

function App() {
  const synth = useRef<SpeechSynthesis | null>(null);
  const [text, setText] = useState("");
  const [availableVoices, setAvailableVoices] =
    useState<SpeechSynthesisVoice[]>();

  useEffect(() => {
    if (window.speechSynthesis) {
      synth.current = window.speechSynthesis;
      setAvailableVoices(synth.current.getVoices());
    }
  }, []);

  useEffect(() => {
    if (synth.current && !availableVoices?.length) {
      setAvailableVoices(synth.current.getVoices());
    }
  }, [availableVoices]);

  const speak = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    synth.current?.speak(new SpeechSynthesisUtterance(text));
    setText("");
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
          <input
            value={text}
            type="text"
            onChange={({ target }) => setText(target.value)}
          />
          <button disabled={!text.length} type="submit">
            Speak
          </button>
        </form>
        <VoiceSelect voices={availableVoices} />
      </div>
    </div>
  );
}

export default App;
