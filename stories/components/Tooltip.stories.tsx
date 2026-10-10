import type { Meta, StoryObj } from '@storybook/nextjs';
import Tooltip from '@components/ui/Tooltip';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const meta = {
	title: 'Components/UI/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		content: {
			control: 'text',
			defaultValue: 'Test',
			description: 'Button label'
		},
		gap: {
			control: 'number',
			defaultValue: 8,
			description: 'Gap'
		},
		placement: {
			options: ['top', 'bottom', 'left', 'right', 'auto'],
			defaultValue: 'auto'
		}
	}
} satisfies Meta<typeof Tooltip>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		content: 'Test value',
		children: <CheckCircleIcon className="h-5 w-5" />,
		placement: 'right',
		gap: 8
	}
};
