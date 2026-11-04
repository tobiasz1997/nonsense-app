import type { ReactElement } from 'react';
import ErrorModal from '@components/ui/ErrorModal';
import { render as renderComponent, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../../messages/en.json';
import pl from '../../../../messages/pl.json';

const render = (component: ReactElement, locale: 'en' | 'pl' = 'en') =>
	renderComponent(component, {
		wrapper: ({ children }) => (
			<NextIntlClientProvider
				locale={locale}
				messages={locale === 'pl' ? pl : en}
			>
				{children}
			</NextIntlClientProvider>
		)
	});

describe('Error Modal', () => {
	const label = 'Test';
	const action = vi.fn(() => null);

	it('should render without crashing', () => {
		const { container } = render(
			<ErrorModal onAction={action} onClose={action} />
		);
		expect(container).toMatchSnapshot();
	});

	it('should button label be correct', () => {
		render(<ErrorModal onAction={action} onClose={action} label={label} />);

		const labelInDoc = screen.getByText(label);

		expect(labelInDoc).toBeInTheDocument();
	});

	it('renders the error message in Polish', () => {
		render(<ErrorModal onAction={action} onClose={action} />, 'pl');
		expect(screen.getByText(pl.common.errorTitle)).toBeInTheDocument();
		expect(screen.getByText(pl.common.unexpectedError)).toBeInTheDocument();
	});
});
