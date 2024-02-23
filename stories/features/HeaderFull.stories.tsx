import type { Meta, StoryObj } from '@storybook/react';
import HeaderFull from '@components/features/Header/HeaderFull';

const meta = {
	title: 'Features/Header full',
	component: HeaderFull,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {
		children: { control: false }
	}
} satisfies Meta<typeof HeaderFull>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
