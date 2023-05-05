import { fireEvent, render, screen } from '@testing-library/react';
import FormInput from '@components/ui/FormInput';

describe('Form Input', () => {
	const content = '@#$%^&*()qwerty';

	it('should render without crashing', () => {
		const { container } = render(<FormInput />);
		expect(container).toMatchSnapshot();
	});

	it('should have correct value', async () => {
		render(<FormInput />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: content } });

		expect(input).toHaveDisplayValue(content);
	});
});
