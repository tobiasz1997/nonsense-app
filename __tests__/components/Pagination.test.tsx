import { render, screen } from '@testing-library/react';
import Pagination from '@components/ui/Pagination';

describe('Pagination', () => {
	const page = 1;
	const pageSize = 10;
	const itemCount = 20;
	const setPage = jest.fn(() => null);

	it('should render without crashing', () => {
		const { container } = render(
			<Pagination
				page={page}
				pageSize={pageSize}
				itemCount={itemCount}
				setPage={setPage}
			/>
		);
		expect(container).toMatchSnapshot();
	});

	it('should view be correct', () => {
		render(
			<Pagination
				page={page}
				pageSize={pageSize}
				itemCount={itemCount}
				setPage={setPage}
			/>
		);

		const leftButton = screen.getByTestId('left');
		const rightButton = screen.getByTestId('right');

		expect(leftButton).toBeDisabled();
		expect(rightButton).not.toBeDisabled();
	});
});
