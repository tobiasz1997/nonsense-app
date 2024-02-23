import type { Meta, StoryObj } from '@storybook/react';
import Footer from '@components/features/Footer/Footer';

const meta = {
	title: 'Features/Footer',
	component: Footer,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {
		children: { control: false }
	}
} satisfies Meta<typeof Footer>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
