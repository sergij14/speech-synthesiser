import { Select } from "antd";
import { SetStateType } from "../types";

export const VoiceSelect = ({
  voices,
  setter,
}: {
  voices: SpeechSynthesisVoice[] | null;
  setter: SetStateType<number>;
}) => (
  <Select defaultValue={0} onChange={(value) => setter(value)} >
    {(voices || []).map((voice, i) => (
      <Select.Option key={voice.voiceURI} value={i}>
        {voice.name}
      </Select.Option>
    ))}
  </Select>
);
