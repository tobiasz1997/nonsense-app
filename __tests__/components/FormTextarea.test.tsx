import FormTextarea from '@components/ui/FormTextarea';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Form Textarea', () => {
	const content = '@#$%^&*()qwerty';

	it('should render without crashing', () => {
		const { container } = render(<FormTextarea />);
		expect(container).toMatchSnapshot();
	});

	it('should have correct value', () => {
		render(<FormTextarea />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: content } });

		expect(input).toHaveDisplayValue(content);
	});

	it('should value 3 rows by default', () => {
		render(<FormTextarea />);

		const text = screen.getByRole('textbox');

		expect(text).toHaveAttribute('rows', '3');
	});
});
