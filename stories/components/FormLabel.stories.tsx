import type { Meta, StoryObj } from '@storybook/react';
import FormLabel from '@components/ui/FormLabel';

const meta = {
	title: 'Components/Form/Label',
	component: FormLabel,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: 'text',
			defaultValue: 'Test',
			description: 'Value'
		},
		required: {
			control: 'boolean',
			defaultValue: false,
			type: 'boolean'
		}
	}
} satisfies Meta<typeof FormLabel>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		children: 'First name'
	}
};
