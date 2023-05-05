import { render } from '@testing-library/react';
import Spinner from '@components/ui/Spinner';

describe('Spinner', () => {
	it('should render without crashing', () => {
		const { container } = render(<Spinner />);
		expect(container).toMatchSnapshot();
	});
});
