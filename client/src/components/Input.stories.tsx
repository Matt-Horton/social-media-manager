import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import Input from "./Input";

export default {
  component: Input,
  title: "Design System/Atoms/Input",
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  const [text, setText] = useState("");

  return (
    <Input {...args} value={text} onChange={(newText) => setText(newText)} />
  );
};

export const Text = Template.bind({});
Text.args = {
  id: "username",
  type: "text",
  name: "Username",
  value: "",
  onChange: () => null,
  placeholder: "johnsmith@gmail.com",
};

export const Password = Template.bind({});
Password.args = {
  id: "password",
  type: "password",
  name: "Password",
  value: "",
  onChange: () => null,
  placeholder: "Password123",
};
