import type { Meta, StoryObj } from '@storybook/react';
import FormCheckbox from '@components/ui/FormCheckbox';

const meta = {
	title: 'Components/Form/Checkbox',
	component: FormCheckbox,
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
		type: {
			control: 'radio',
			defaultValue: 'checkbox',
			options: ['checkbox', 'radio']
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			type: 'boolean'
		}
	}
} satisfies Meta<typeof FormCheckbox>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Checkbox: Story = {
	args: {
		label: 'Checkbox Label'
	}
};

export const Radio: Story = {
	args: {
		label: 'Checkbox Label',
		type: 'radio'
	}
};
