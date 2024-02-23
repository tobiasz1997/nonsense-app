import type { Meta, StoryObj } from '@storybook/react';
import LayoutFull from '@components/layouts/LayoutFull';

const meta = {
	title: 'Layouts/Layout full',
	component: LayoutFull,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {
		children: { control: false }
	}
} satisfies Meta<typeof LayoutFull>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
