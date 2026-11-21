import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar from './Avatar';

const meta = {
	title: 'Components/UI/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	args: { className: 'bg-green-dark text-pistachio' },
	argTypes: { size: { control: 'inline-radio', options: ['small', 'default'] } }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { name: 'John Snow' } };
