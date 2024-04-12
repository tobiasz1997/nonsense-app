import { fireEvent, render, screen } from '@testing-library/react';
import FormCheckbox from '@components/ui/FormCheckbox';

describe('Form Checkbox', () => {
	const label = '@#$%^&*()qwerty';

	it('should render checkbox without crashing', () => {
		const { container } = render(<FormCheckbox label={label} />);
		expect(container).toMatchSnapshot();
	});

	it('should render radio without crashing', () => {
		const { container } = render(<FormCheckbox label={label} type="radio" />);
		expect(container).toMatchSnapshot();
	});

	it('should have correct value on click', async () => {
		render(<FormCheckbox label={label} />);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(screen.getByText(label));

		expect(checkbox).toBeChecked();
	});

	it('should have correct value on double click', async () => {
		render(<FormCheckbox label={label} />);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.dblClick(screen.getByText(label));

		expect(checkbox).not.toBeChecked();
	});

	it('should only one radio checkbox be checked', async () => {
		const labelOne = 'labelOne';
		const labelTwo = 'labelTwo';

		render(
			<form>
				<FormCheckbox
					label={labelOne}
					name="test"
					type="radio"
					data-testid={labelOne}
				/>
				<FormCheckbox
					label={labelTwo}
					name="test"
					type="radio"
					data-testid={labelTwo}
				/>
			</form>
		);

		const checkboxOne = screen.getByTestId(labelOne);
		const checkboxTwo = screen.getByTestId(labelTwo);
		fireEvent.click(screen.getByTestId(labelOne));
		fireEvent.click(screen.getByTestId(labelTwo));
		fireEvent.click(screen.getByTestId(labelOne));

		expect(checkboxOne).toBeChecked();
		expect(checkboxTwo).not.toBeChecked();
	});
});
