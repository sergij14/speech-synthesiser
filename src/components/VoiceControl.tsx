import { Slider } from "antd";
import { SetStateType } from "../types";

export const VoiceControl = ({
    value,
    setter,
  }: {
    value: number;
    setter: SetStateType<number>;
  }) => (
    <Slider
      range={false}
      onChange={(value) => setter(value)}
      value={value}
      step={0.1}
      min={1}
      max={1.5}
    />
  );