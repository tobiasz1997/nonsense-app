import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  ThemeStoryProvider,
  type ThemeValue,
} from "../../../../.storybook/mocks/ThemeProvider";
import ThemePanel from "./ThemePanel";

type StoryArgs = {
  initialTheme: ThemeValue["theme"];
};

const meta = {
  title: "Features/Theme panel",
  component: ThemePanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    initialTheme: "light",
  },
  argTypes: {
    initialTheme: {
      control: "inline-radio",
      options: ["light", "dark"],
      description: "Initial theme of the isolated preview.",
    },
  },
  render: ({ initialTheme }) => (
    <ThemeStoryProvider key={initialTheme} initialTheme={initialTheme}>
      <div className="rounded-xl bg-pistachio p-8 dark:bg-zinc-800">
        <ThemePanel />
      </div>
    </ThemeStoryProvider>
  ),
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { initialTheme: "light" },
};
