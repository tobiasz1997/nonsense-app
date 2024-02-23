import type { Meta, StoryObj } from '@storybook/react';
import LayoutMinimal from '@components/layouts/LayoutMinimal';

const meta = {
	title: 'Layouts/Layout minimal',
	component: LayoutMinimal,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {
		children: { control: false }
	}
} satisfies Meta<typeof LayoutMinimal>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
