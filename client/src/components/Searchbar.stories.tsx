import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default {
  component: SearchBar,
  title: "Design System/Atoms/Search Bar",
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => {
  const [value, setValue] = useState<string>("");
  return <SearchBar {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
