import { Button, Form, Input, Layout, Space, Typography } from "antd";
import { SoundOutlined } from "@ant-design/icons";
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

  const onSubmit = () => {
    speak({ text, rate, pitch, selectedVoiceIdx });
    setText("");
  };

  return (
    <Form
      layout="vertical"
      style={{ maxWidth: 600, padding: "32px", margin: "0 auto" }}
      onFinish={onSubmit}
    >
      <Typography.Title
        style={{
          textTransform: "uppercase",
          fontSize: '2rem',
          textAlign: "center",
          fontWeight: 900,
          color: "#444",
        }}
      >
        speech synthesieser
      </Typography.Title>
      <Space.Compact block>
        <Form.Item style={{ width: "60%" }}>
          <Input
            value={text}
            placeholder="Type a text..."
            type="text"
            onChange={({ target }) => setText(target.value)}
          />
        </Form.Item>
        <Form.Item style={{ width: "40%" }}>
          {availableVoices && (
            <VoiceSelect
              setter={setSelectedVoiceIdx}
              voices={availableVoices}
            />
          )}
        </Form.Item>
      </Space.Compact>
      <Space.Compact block style={{ display: "flex", gap: "10px" }}>
        <Form.Item label="Rate" style={{ width: "50%" }}>
          <VoiceControl setter={setRate} value={rate} />
        </Form.Item>
        <Form.Item label="Pitch" style={{ width: "50%" }}>
          <VoiceControl setter={setPitch} value={pitch} />
        </Form.Item>
      </Space.Compact>
      <Form.Item>
        <Button
          icon={<SoundOutlined />}
          htmlType="submit"
          disabled={!text.length}
          type="primary"
        >
          Speak
        </Button>
      </Form.Item>
    </Form>
  );
}

export default App;
