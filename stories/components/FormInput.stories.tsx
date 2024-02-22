import type { Meta, StoryObj } from '@storybook/react';
import FormInput from '@components/ui/FormInput';

const meta = {
	title: 'Components/Form/Input',
	component: FormInput,
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
		placeholder: {
			control: 'text',
			description: 'Placeholder',
			defaultValue: '',
			type: 'string'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			type: 'boolean'
		}
	}
} satisfies Meta<typeof FormInput>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
