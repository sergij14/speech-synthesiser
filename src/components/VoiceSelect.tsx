import { SetStateType } from "../types";

export const VoiceSelect = ({
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