import Loader from '@components/ui/Loader';
import { render } from '@testing-library/react';

describe('Loader', () => {
	it('should render without crashing', () => {
		const { container } = render(<Loader />);
		expect(container).toMatchSnapshot();
	});
});
