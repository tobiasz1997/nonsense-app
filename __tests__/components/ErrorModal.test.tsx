import { render, screen } from '@testing-library/react';
import ErrorModal from '@components/ui/ErrorModal';

describe('Error Modal', () => {
	const label = 'Test';
	const action = jest.fn(() => null);

	it('should render without crashing', () => {
		const { container } = render(
			<ErrorModal onAction={action} onClose={action} />
		);
		expect(container).toMatchSnapshot();
	});

	it('should button label be correct', () => {
		render(<ErrorModal onAction={action} onClose={action} label={label} />);

		const labelInDoc = screen.getByText(label);

		expect(labelInDoc).toBeInTheDocument();
	});
});
