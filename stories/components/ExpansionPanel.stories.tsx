import type { Meta, StoryObj } from '@storybook/react';
import ExpansionPanel from '@components/ui/ExpansionPanel';

const meta = {
	title: 'Components/UI/Expansion Panel',
	component: ExpansionPanel,
	decorators: [
		(Story) => (
			<div style={{ padding: '3em' }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: 'fullscreen',
		label: {
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
} satisfies Meta<typeof ExpansionPanel>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		label: 'Filter'
	},
	render: (args) => (
		<ExpansionPanel label={args.label}>
			<div className="flex items-center justify-center bg-pistachio">
				Test value
			</div>
		</ExpansionPanel>
	)
};
