import type { Meta, StoryObj } from '@storybook/react';
import Spinner from '@components/ui/Spinner';

const meta = {
	title: 'Components/UI/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof Spinner>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {};
