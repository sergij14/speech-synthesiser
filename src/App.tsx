import { useState } from "react";
import { VoiceControl } from "./components/VoiceControl";
import { VoiceSelect } from "./components/VoiceSelect";
import useSpeaker from "./hooks/useSpeaker";

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
    <div>
      <h1>Speech Synthesieser</h1>
      <div>
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
        <VoiceControl setter={setRate} value={rate} />

        <p>pitch</p>
        <VoiceControl setter={setPitch} value={pitch} />
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
