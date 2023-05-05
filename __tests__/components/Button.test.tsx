import { render, screen } from '@testing-library/react';
import Button from '@components/ui/Button';

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
});
