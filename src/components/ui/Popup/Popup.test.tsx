import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import Popup from './Popup';

describe('Popup', () => {
	it('hides content until its trigger is activated', async () => {
		const user = userEvent.setup();
		render(<Example />);
		const trigger = screen.getByRole('button', { name: 'Open' });
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(
			screen.queryByRole('button', { name: 'Action' })
		).not.toBeInTheDocument();
		await user.click(trigger);
		const popup = document.getElementById(
			trigger.getAttribute('aria-controls') ?? ''
		);
		expect(popup?.tagName).toBe('DIV');
		expect(popup).not.toHaveAttribute('role');
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		expect(trigger).not.toHaveAttribute('aria-haspopup');
		expect(screen.getByRole('button', { name: 'Action' })).toHaveFocus();
	});

	it('closes on Escape and returns focus to the trigger', async () => {
		const user = userEvent.setup();
		render(<Example />);
		const trigger = screen.getByRole('button', { name: 'Open' });
		await user.click(trigger);
		await user.keyboard('{Escape}');
		expect(trigger).toHaveFocus();
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(trigger).not.toHaveAttribute('aria-controls');
	});

	it('closes on an outside click', async () => {
		const user = userEvent.setup();
		render(<Example />);
		await user.click(screen.getByRole('button', { name: 'Open' }));
		await user.click(document.body);
		expect(
			screen.queryByRole('button', { name: 'Action' })
		).not.toBeInTheDocument();
	});

	it('keeps the popup open when interacting with its contents', async () => {
		const user = userEvent.setup();
		render(
			<Example>
				<input aria-label="Value" />
			</Example>
		);
		await user.click(screen.getByRole('button', { name: 'Open' }));
		const input = screen.getByRole('textbox', { name: 'Value' });
		await user.type(input, 'example');
		expect(input).toHaveValue('example');
		expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute(
			'aria-expanded',
			'true'
		);
	});

	it('closes on a second trigger click', async () => {
		const user = userEvent.setup();
		render(<Example />);
		const trigger = screen.getByRole('button', { name: 'Open' });
		await user.click(trigger);
		await user.click(trigger);
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	it('allows Tab to leave the popup and closes without trapping focus', async () => {
		const user = userEvent.setup();
		render(
			<>
				<Example />
				<button type="button">Outside</button>
			</>
		);
		await user.click(screen.getByRole('button', { name: 'Open' }));
		await user.tab();
		expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
		expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute(
			'aria-expanded',
			'false'
		);
	});

	it('focuses a link and skips disabled controls', async () => {
		const user = userEvent.setup();
		render(
			<Example>
				<button disabled>Unavailable</button>
				<a href="https://example.com">Link</a>
			</Example>
		);
		await user.click(screen.getByRole('button', { name: 'Open' }));
		expect(screen.getByRole('link', { name: 'Link' })).toHaveFocus();
	});

	it('focuses the content container when it has no interactive elements', async () => {
		const user = userEvent.setup();
		render(
			<Example>
				<p>Information</p>
			</Example>
		);
		const trigger = screen.getByRole('button', { name: 'Open' });
		await user.click(trigger);
		const popup = document.getElementById(
			trigger.getAttribute('aria-controls') ?? ''
		);
		expect(popup).toHaveFocus();
	});

	it('supports keyboard activation of the trigger', async () => {
		const user = userEvent.setup();
		render(<Example />);
		await user.tab();
		await user.keyboard('{Enter}');
		expect(screen.getByRole('button', { name: 'Action' })).toHaveFocus();
	});

	it('does not keep dismissal listeners after closing', async () => {
		const onOpenChange = vi.fn();
		const trigger = (props: { onClick: () => void }) => (
			<button {...props}>Open</button>
		);
		const { rerender } = render(
			<Popup isOpen onOpenChange={onOpenChange} trigger={trigger}>
				Information
			</Popup>
		);
		rerender(
			<Popup isOpen={false} onOpenChange={onOpenChange} trigger={trigger}>
				Information
			</Popup>
		);
		fireEvent.keyDown(document, { key: 'Escape' });
		fireEvent.pointerDown(document.body);
		expect(onOpenChange).not.toHaveBeenCalled();
	});

	it('does not reset focus when a parent updates its callback', async () => {
		const user = userEvent.setup();
		const trigger = (props: { onClick: () => void }) => (
			<button {...props}>Open</button>
		);
		const content = (
			<>
				<button>First</button>
				<button>Second</button>
			</>
		);
		const { rerender } = render(
			<Popup isOpen onOpenChange={vi.fn()} trigger={trigger}>
				{content}
			</Popup>
		);
		await user.tab();
		rerender(
			<Popup isOpen onOpenChange={vi.fn()} trigger={trigger}>
				{content}
			</Popup>
		);
		expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
	});
});

function Example({
	children = <button type="button">Action</button>
}: {
	children?: ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Popup
			isOpen={isOpen}
			onOpenChange={(open) => setIsOpen(open)}
			trigger={(props) => (
				<button type="button" {...props}>
					Open
				</button>
			)}
		>
			{children}
		</Popup>
	);
}
