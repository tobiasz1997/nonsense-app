import { render } from '@testing-library/react';
import Divider from '@components/ui/Divider';

describe('Divider', () => {
	it('should render without crashing', () => {
		const { container } = render(<Divider />);
		expect(container).toMatchSnapshot();
	});
});
