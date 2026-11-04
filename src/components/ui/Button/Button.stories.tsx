import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '@components/ui/Button';
import { CheckIcon } from '@heroicons/react/24/solid';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { StoryWrapper } from '../../../../.storybook/components/StoryWrapper';

const meta = {
	title: 'Components/UI/Button',
	component: Button,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	args: {
		disabled: false
	},
	argTypes: {
		children: {
			control: 'text',
			defaultValue: 'Test',
			description: 'Button label'
		},
		icon: {
			options: ['Check', 'None'],
			mapping: {
				Check: <CheckIcon aria-hidden="true" />,
				None: null
			}
		},
		disabled: {
			control: 'boolean'
		},
		'aria-label': {
			control: 'text',
			description:
				'Accessible name; defaults to Confirm for an icon-only button.'
		}
	},
	render: (args) => (
		<Button
			{...args}
			aria-label={
				args['aria-label'] ||
				(args.icon && !args.children ? 'Confirm' : undefined)
			}
		/>
	)
} satisfies Meta<typeof Button>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Primary',
		size: 'default',
		variant: 'primary',
		onClick: fn(async () => {
			await new Promise<void>((resolve) => setTimeout(resolve, 1200));
		})
	},
	play: async ({ canvasElement, args }) => {
		if (args.disabled || args.submitting) {
			return;
		}
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await expect(button).toBeDisabled();
		await expect(button).toHaveAttribute('aria-busy', 'true');
		await expect(button).toHaveAccessibleName();
		await waitFor(() => expect(button).toBeEnabled(), { timeout: 3000 });
		await expect(button).not.toHaveAttribute('aria-busy', 'true');
	},
	parameters: {
		layout: 'fullscreen'
	},
	decorators: [
		(Story) => (
			<StoryWrapper className="max-w-xl">
				<Story />
			</StoryWrapper>
		)
	]
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
// More on argTypes: https://storybook.js.org/docs/api/argtypes
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
