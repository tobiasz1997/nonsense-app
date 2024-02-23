import type { Meta, StoryObj } from '@storybook/react';
import Loader from '@components/ui/Loader';

const meta = {
	title: 'Components/UI/Loader',
	component: Loader,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		error: { control: false }
	}
} satisfies Meta<typeof Loader>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
