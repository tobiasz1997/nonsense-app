import Spinner from '@components/ui/Spinner';
import { render } from '@testing-library/react';

describe('Spinner', () => {
	it('should render without crashing', () => {
		const { container } = render(<Spinner />);
		expect(container).toMatchSnapshot();
	});
});
