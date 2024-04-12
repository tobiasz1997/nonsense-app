import { render, screen } from '@testing-library/react';
import ModalBox from '@components/ui/ModalBox';

describe('Modal Box', () => {
	const content = 'content';
	const action = jest.fn(() => null);

	it('should render without crashing', () => {
		const { container } = render(<ModalBox onClose={action} />);
		expect(container).toMatchSnapshot();
	});

	it('should content be not visible', () => {
		render(<ModalBox onClose={action}>{content}</ModalBox>);

		const contentInDoc = screen.queryByText(content);

		expect(contentInDoc).toBeInTheDocument();
	});
});
