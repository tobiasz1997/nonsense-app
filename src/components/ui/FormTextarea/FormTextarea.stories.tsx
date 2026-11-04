import type { Meta, StoryObj } from '@storybook/nextjs';
import FormTextarea from '@components/ui/FormTextarea';

const meta = {
	title: 'Components/Form/Textarea',
	component: FormTextarea,
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
		rows: {
			control: 'number',
			description: 'Row number',
			defaultValue: '3',
			type: 'number'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			type: 'boolean'
		}
	}
} satisfies Meta<typeof FormTextarea>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
