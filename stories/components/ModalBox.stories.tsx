import type { Meta, StoryObj } from '@storybook/react';
import ModalBox from '@components/ui/ModalBox';

const meta = {
	title: 'Components/UI/Modal Box',
	component: ModalBox,
	decorators: [
		(Story) => (
			<div
				style={{
					padding: '3em',
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: 'fullscreen',
		children: {
			control: false
		}
	},
	tags: ['autodocs']
} satisfies Meta<typeof ModalBox>;

export default meta;
export type Story = StoryObj<typeof meta>;
export const Default: Story = {
	render: (args) => (
		<ModalBox onClose={() => null}>
			<div className="flex items-center justify-center">Test value</div>
		</ModalBox>
	)
};
