import React, { useEffect, useRef, useState } from "react";

const useSpeaker = () => {
  const synth = useRef<SpeechSynthesis | null>(null);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[] | null
  >(null);

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

  const speak = ({ text, rate, pitch, selectedVoice }: any) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = availableVoices && availableVoices[selectedVoice];
    utter.pitch = pitch;
    utter.rate = rate;

    synth.current?.speak(utter);
  };

  return { availableVoices, speak };
};

export default useSpeaker;
