import { fireEvent, render, screen } from '@testing-library/react';
import ExpansionPanel from '@components/ui/ExpansionPanel';

describe('Expansion Panel', () => {
	const label = 'Test';
	const content = 'content';

	it('should render without crashing', () => {
		const { container } = render(<ExpansionPanel label={label} />);
		expect(container).toMatchSnapshot();
	});

	it('should title be correct', () => {
		render(<ExpansionPanel label={label} />);

		const labelInDoc = screen.getByText(label);

		expect(labelInDoc).toBeInTheDocument();
	});

	it('should content be not visible', () => {
		render(<ExpansionPanel label={label}>{content}</ExpansionPanel>);

		const contentInDoc = screen.queryByText(content);

		expect(contentInDoc).not.toBeInTheDocument();
	});

	it('should content be visible', () => {
		render(<ExpansionPanel label={label}>{content}</ExpansionPanel>);

		fireEvent.click(screen.getByText(label));
		const contentInDoc = screen.queryByText(content);

		expect(contentInDoc).toBeInTheDocument();
	});
});
