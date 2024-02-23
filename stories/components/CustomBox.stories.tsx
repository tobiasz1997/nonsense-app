import type { Meta, StoryObj } from '@storybook/react';
import CustomBox from '@components/ui/CustomBox';

const meta = {
	title: 'Components/UI/Custom Box',
	component: CustomBox,
	decorators: [
		(Story) => (
			<div style={{ padding: '3em' }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: 'fullscreen',
		title: {
			control: 'text',
			description: 'Label',
			defaultValue: '',
			type: 'string'
		},
		children: {
			control: false
		}
	},
	tags: ['autodocs']
} satisfies Meta<typeof CustomBox>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		title: 'Custom Title'
	},
	render: (args) => (
		<CustomBox title={args.title}>
			<div className="flex items-center justify-center">Test value</div>
		</CustomBox>
	)
};
