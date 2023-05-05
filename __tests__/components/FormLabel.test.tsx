/*
 * @jest-environment jsdom
 * */

import { render, screen } from '@testing-library/react';
import FormLabel from '@components/ui/FormLabel';

describe('Form Label', () => {
	const content = '@#$%^&*()qwerty';

	it('should render without crashing', () => {
		const { container } = render(<FormLabel>{content}</FormLabel>);
		expect(container).toMatchSnapshot();
	});

	it('should value be correct', () => {
		render(<FormLabel required>{content}</FormLabel>);

		const text = screen.getByText(content);

		expect(text).toBeInTheDocument();
	});
});
