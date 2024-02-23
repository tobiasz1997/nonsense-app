import type { Meta, StoryObj } from '@storybook/react';
import HeaderMinimal from '@components/features/Header/HeaderMinimal';

const meta = {
	title: 'Features/Header minimal',
	component: HeaderMinimal,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {
		children: { control: false }
	}
} satisfies Meta<typeof HeaderMinimal>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
