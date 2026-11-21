import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Tooltip from './Tooltip';

beforeEach(() => {
	vi.stubGlobal(
		'ResizeObserver',
		class {
			observe() {}
			unobserve() {}
			disconnect() {}
		}
	);
	vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
		window.setTimeout(() => callback(performance.now()), 0)
	);
	vi.stubGlobal('cancelAnimationFrame', (id: number) =>
		window.clearTimeout(id)
	);
});

afterEach(() => vi.unstubAllGlobals());

describe('Tooltip dismissal', () => {
	it('renders its content in a portal and closes on an outside pointer event', async () => {
		const { container } = render(<Tooltip content="Details">Trigger</Tooltip>);
		fireEvent.mouseEnter(screen.getByRole('button', { name: 'Trigger' }));
		const tooltip = await screen.findByRole('tooltip');
		expect(container).not.toContainElement(tooltip);
		fireEvent.pointerDown(document.body);
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	});

	it('does not dismiss when interacting with the trigger or portaled content', async () => {
		render(<Tooltip content="Details">Trigger</Tooltip>);
		const trigger = screen.getByRole('button', { name: 'Trigger' });
		fireEvent.mouseEnter(trigger);
		const tooltip = await screen.findByRole('tooltip');
		fireEvent.pointerDown(trigger);
		expect(tooltip).toBeInTheDocument();
		fireEvent.pointerDown(tooltip);
		expect(tooltip).toBeInTheDocument();
	});

	it('does not introduce dismissal on outside focus', async () => {
		render(<Tooltip content="Details">Trigger</Tooltip>);
		fireEvent.mouseEnter(screen.getByRole('button', { name: 'Trigger' }));
		const tooltip = await screen.findByRole('tooltip');
		fireEvent.focusIn(document.body);
		expect(tooltip).toBeInTheDocument();
	});

	it('preserves dismissal with Escape', async () => {
		render(<Tooltip content="Details">Trigger</Tooltip>);
		fireEvent.mouseEnter(screen.getByRole('button', { name: 'Trigger' }));
		await screen.findByRole('tooltip');
		fireEvent.keyDown(document, { key: 'Escape' });
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	});

	it('preserves delayed closing on mouse leave', async () => {
		render(<Tooltip content="Details">Trigger</Tooltip>);
		const trigger = screen.getByRole('button', { name: 'Trigger' });
		fireEvent.mouseEnter(trigger);
		await screen.findByRole('tooltip');
		fireEvent.mouseLeave(trigger);
		await waitFor(() =>
			expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
		);
	});
});
