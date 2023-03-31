import { SetStateType } from "../types";

export const VoiceControl = ({
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