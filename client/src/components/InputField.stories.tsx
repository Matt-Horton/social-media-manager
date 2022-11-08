import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import InputField from "./InputField";

export default {
  component: InputField,
  title: "Design System/Molecules/InputField",
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => {
  const [value, setValue] = useState<string>("");

  return (
    <InputField
      {...args}
      value={value}
      onChange={(newVal) => setValue(newVal)}
    />
  );
};

export const TextField = Template.bind({});
TextField.args = {
  id: "username",
  type: "text",
  name: "username",
  label: "Username",
  placeholder: "johnsmith@gmail.com",
};
