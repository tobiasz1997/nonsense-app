import FormErrorMessage from '@components/ui/FormErrorMessage';
import { render, screen } from '@testing-library/react';

describe('Form Error Message', () => {
	const content = '@#$%^&*()qwerty';

	it('should render without crashing', () => {
		const { container } = render(
			<FormErrorMessage>{content}</FormErrorMessage>
		);
		expect(container).toMatchSnapshot();
	});

	it('should message be correct', () => {
		render(<FormErrorMessage>{content}</FormErrorMessage>);

		const text = screen.getByText(content);

		expect(text).toBeInTheDocument();
	});
});
