import Button from '@components/ui/Button';
import { CheckIcon } from '@heroicons/react/24/solid';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
	const content = '@#$%^&*()qwerty';

	it('should render without crashing', () => {
		const { container } = render(<Button>{content}</Button>);
		expect(container).toMatchSnapshot();
	});

	it('should label be correct', () => {
		render(<Button>{content}</Button>);

		const text = screen.getByText(content);

		expect(text).toBeInTheDocument();
	});

	it('calls onClick once when clicked', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>{content}</Button>);

		await user.click(screen.getByRole('button', { name: content }));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(
			<Button disabled onClick={handleClick}>
				{content}
			</Button>
		);
		const button = screen.getByRole('button', { name: content });

		await user.click(button);

		expect(button).toBeDisabled();
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('blocks clicks and preserves its accessible name while submitting', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		const { rerender } = render(
			<Button submitting onClick={handleClick}>
				{content}
			</Button>
		);
		const button = screen.getByRole('button', { name: content });

		await user.click(button);

		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-busy', 'true');
		expect(button).toHaveAccessibleName(content);
		expect(handleClick).not.toHaveBeenCalled();

		rerender(
			<Button submitting={false} onClick={handleClick}>
				{content}
			</Button>
		);

		expect(button).toBeEnabled();
		expect(button).not.toHaveAttribute('aria-busy', 'true');
		await user.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it.each(['{Enter}', ' '])(
		'supports keyboard activation with %s',
		async (key) => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>{content}</Button>);
			const button = screen.getByRole('button', { name: content });

			await user.tab();
			expect(button).toHaveFocus();
			await user.keyboard(key);

			expect(handleClick).toHaveBeenCalledTimes(1);
		}
	);

	it('uses aria-label as the accessible name of an icon-only button', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(
			<Button
				icon={<CheckIcon aria-hidden="true" />}
				aria-label="Confirm"
				onClick={handleClick}
			/>
		);

		await user.click(screen.getByRole('button', { name: 'Confirm' }));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('blocks the button while an asynchronous click is pending', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn(
			() =>
				new Promise<void>((resolve) => {
					setTimeout(resolve, 250);
				})
		);
		render(<Button onClick={handleClick}>{content}</Button>);
		const button = screen.getByRole('button', { name: content });

		await user.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-busy', 'true');

		await waitFor(() => expect(button).toBeEnabled());
		expect(button).not.toHaveAttribute('aria-busy', 'true');
	});
});
