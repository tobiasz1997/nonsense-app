import { render, screen } from '@testing-library/react';
import CustomBox from '@components/ui/CustomBox';

describe('Custom Box', () => {
	const title = 'Test Title';
	const content = 'Test Content';
	it('should render without crashing', () => {
		const { container } = render(<CustomBox title={title}></CustomBox>);
		expect(container).toMatchSnapshot();
	});

	it('should title be correct', () => {
		render(<CustomBox title={title}></CustomBox>);

		const titleInDoc = screen.getByText(title);

		expect(titleInDoc).toBeInTheDocument();
	});

	it('should content be correct', () => {
		render(<CustomBox title={title}>{content}</CustomBox>);

		const contentInDoc = screen.getByText(content);

		expect(contentInDoc).toBeInTheDocument();
	});
});
