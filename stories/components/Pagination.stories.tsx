import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '@components/ui/Pagination';

const meta = {
	title: 'Components/UI/Pagination',
	component: Pagination,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
} satisfies Meta<typeof Pagination>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		page: 1,
		pageSize: 10,
		itemCount: 20,
		setPage: action('on-click')
	}
};
