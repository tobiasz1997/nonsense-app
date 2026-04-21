import type { Meta, StoryObj } from '@storybook/nextjs';
import FormErrorMessage from '@components/ui/FormErrorMessage';

const meta = {
	title: 'Components/Form/Error Message',
	component: FormErrorMessage,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: 'text',
			defaultValue: 'Test',
			description: 'Value'
		}
	}
} satisfies Meta<typeof FormErrorMessage>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		children: 'Invalid name'
	}
};
