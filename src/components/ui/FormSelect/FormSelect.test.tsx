import FormSelect from '@components/ui/FormSelect';
import { SelectOption } from '@interfaces/selectOption';
import { render } from '@testing-library/react';

describe('Form Select', () => {
	const setup = () => {
		const options: SelectOption[] = [
			{
				label: 'First',
				value: 1
			},
			{
				label: 'Second',
				value: 2
			}
		];

		return {
			options
		};
	};

	it('should render without crashing', () => {
		const { options } = setup();
		const { container } = render(<FormSelect options={options} />);
		expect(container).toMatchSnapshot();
	});
});
