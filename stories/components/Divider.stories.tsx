import type { Meta, StoryObj } from '@storybook/react';
import Divider from '@components/ui/Divider';

const meta = {
	title: 'Components/UI/Divider',
	component: Divider,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ padding: '3em' }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {
		className: { control: false }
	}
} satisfies Meta<typeof Divider>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		className: 'w-full'
	}
};
