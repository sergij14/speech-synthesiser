import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const VoiceSelect = ({
  voices,
  setter,
}: {
  voices: SpeechSynthesisVoice[] | null;
  setter: React.Dispatch<React.SetStateAction<number>>;
}) => (
  <select onChange={({ target }) => setter(parseInt(target.value))}>
    {(voices || []).map((voice, i) => (
      <option key={voice.voiceURI} value={i}>
        {voice.name}
      </option>
    ))}
  </select>
);

function App() {
  const synth = useRef<SpeechSynthesis | null>(null);
  const [text, setText] = useState("");
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[] | null
  >(null);
  const [selectedVoice, setSelectedVoice] = useState(0);

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
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = availableVoices && availableVoices[selectedVoice];

    synth.current?.speak(utter);
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
        <VoiceSelect setter={setSelectedVoice} voices={availableVoices} />
      </div>
    </div>
  );
}

export default App;
