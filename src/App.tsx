import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useSpeaker from "./hooks/useSpeaker";

type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

const VoiceSelect = ({
  voices,
  setter,
}: {
  voices: SpeechSynthesisVoice[] | null;
  setter: SetStateType<number>;
}) => (
  <select onChange={({ target }) => setter(parseInt(target.value))}>
    {(voices || []).map((voice, i) => (
      <option key={voice.voiceURI} value={i}>
        {voice.name}
      </option>
    ))}
  </select>
);

const VoiceEditInput = ({
  value,
  setter,
}: {
  value: number;
  setter: SetStateType<number>;
}) => (
  <input
    type="range"
    onChange={({ target }) => setter(parseFloat(target.value))}
    value={value}
    step="0.1"
    min="1"
    max="1.5"
  />
);

function App() {
  const [text, setText] = useState("");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [selectedVoiceIdx, setSelectedVoiceIdx] = useState(0);

  const { availableVoices, speak } = useSpeaker();

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    speak({ text, rate, pitch, selectedVoiceIdx });
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
        <form onSubmit={onSubmit}>
          <input
            value={text}
            type="text"
            onChange={({ target }) => setText(target.value)}
          />
          <button disabled={!text.length} type="submit">
            Speak
          </button>
        </form>
        <p>rate</p>
        <VoiceEditInput setter={setRate} value={rate} />

        <p>pitch</p>
        <VoiceEditInput setter={setPitch} value={pitch} />
        <p>
          pitch {pitch}, rate {rate}
        </p>

        {availableVoices && (
          <VoiceSelect setter={setSelectedVoiceIdx} voices={availableVoices} />
        )}
      </div>
    </div>
  );
}

export default App;
