import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
	it.each([
		{ name: 'John Snow', initials: 'JS' },
		{ name: '  John   Snow  ', initials: 'JS' },
		{ name: 'John', initials: 'J' },
		{ name: 'Anna Maria Kowalska', initials: 'AK' },
		{ name: 'Łukasz Żak', initials: 'ŁŻ' }
	])('shows initials from $name', ({ name, initials }) => {
		const { container } = render(<Avatar name={name} />);
		expect(screen.getByText(initials)).toBeInTheDocument();
		expect(container.querySelector('svg')).not.toBeInTheDocument();
	});

	it.each([
		'john.snow@example.com',
		'john_snow@example.com',
		'john-snow@example.com'
	])('uses email as a fallback: %s', (email) => {
		render(<Avatar name=" " email={email} />);
		expect(screen.getByText('JS')).toBeInTheDocument();
	});

	it('prefers the name over the email', () => {
		render(<Avatar name="Anna Kowalska" email="john.snow@example.com" />);
		expect(screen.getByText('AK')).toBeInTheDocument();
	});

	it.each([undefined, null, '', '   '])(
		'shows a decorative user icon without a usable name: %s',
		(name) => {
			const { container } = render(<Avatar name={name} />);
			expect(container.querySelector('svg')).toHaveAttribute(
				'aria-hidden',
				'true'
			);
		}
	);
});
