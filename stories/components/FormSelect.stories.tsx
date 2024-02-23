import type { Meta, StoryObj } from '@storybook/react';
import FormSelect from '@components/ui/FormSelect';

const meta = {
	title: 'Components/Form/Select',
	component: FormSelect,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Label',
			defaultValue: '',
			type: 'string'
		},
		error: {
			control: 'text',
			description: 'Error message',
			defaultValue: '',
			type: 'string'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			type: 'boolean'
		},
		options: {
			description: 'SelectOption { label: string, value: any}'
		}
	}
} satisfies Meta<typeof FormSelect>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		options: [
			{ label: 'Option 1', value: 1 },
			{ label: 'Option 2', value: 2 }
		]
	}
};
