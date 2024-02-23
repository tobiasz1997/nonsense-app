import { CheckIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/ui/Button';

const meta = {
	title: 'Components/UI/Button',
	component: Button,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: 'text',
			defaultValue: 'Test',
			description: 'Button label'
		},
		icon: {
			options: ['Check', 'None'],
			mapping: {
				Check: <CheckIcon />,
				None: null
			}
		}
	}
} satisfies Meta<typeof Button>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Primary'
	}
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
// More on argTypes: https://storybook.js.org/docs/api/argtypes
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
