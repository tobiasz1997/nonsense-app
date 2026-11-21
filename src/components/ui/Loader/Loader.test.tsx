import type { ReactElement } from 'react';
import Loader from '@components/ui/Loader';
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

describe('Loader', () => {
	it('should render without crashing', () => {
		const { container } = render(<Loader />);
		expect(container).toMatchSnapshot();
	});

	it.each(['en', 'pl'] as const)(
		'renders a safe error message in %s without throwing',
		(locale) => {
			render(
				<Loader error={new TypeError('Failed to fetch: private details')} />,
				locale
			);
			expect(screen.getByRole('alert')).toHaveTextContent(
				(locale === 'pl' ? pl : en).common.unexpectedError
			);
			expect(screen.queryByText(/private details/)).not.toBeInTheDocument();
		}
	);
});
