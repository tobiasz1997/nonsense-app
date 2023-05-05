import { render } from '@testing-library/react';
import Loader from '@components/ui/Loader';

describe('Loader', () => {
	it('should render without crashing', () => {
		const { container } = render(<Loader />);
		expect(container).toMatchSnapshot();
	});
});
