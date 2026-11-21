import type { IJoke } from '@api/jokes.api';
import { useGetJoke } from '@api/jokes.api';
import HomePage from '@pages/index';
import { render as renderComponent, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../messages/en.json';

vi.mock('@api/jokes.api', () => ({ useGetJoke: vi.fn() }));

const joke: IJoke = {
	id: 1,
	type: 'general',
	setup: 'A cached joke setup',
	punchline: 'A cached punchline'
};

describe('home page request states', () => {
	it('shows loading while the initial request is pending', () => {
		mockResponse(undefined, undefined, true, true);
		const { container } = render();
		expect(container.querySelector('svg')).toBeInTheDocument();
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	it.each([false, true])(
		'shows a fetch error without crashing when isValidating is %s',
		(isValidating) => {
			mockResponse(
				undefined,
				new TypeError('Failed to fetch'),
				false,
				isValidating
			);
			render();
			expect(screen.getByRole('alert')).toHaveTextContent(
				en.common.unexpectedError
			);
		}
	);

	it('keeps cached data visible during revalidation', () => {
		mockResponse(joke, undefined, false, true);
		render();
		expect(screen.getByText(joke.setup)).toBeInTheDocument();
		expect(screen.getByText(joke.punchline)).toBeInTheDocument();
	});

	it('keeps cached data visible when revalidation fails', () => {
		mockResponse(joke, new Error('HTTP 503'), false, false);
		render();
		expect(screen.getByText(joke.setup)).toBeInTheDocument();
		expect(screen.getByText(joke.punchline)).toBeInTheDocument();
	});
});

function render() {
	return renderComponent(
		<NextIntlClientProvider locale="en" messages={en}>
			<HomePage />
		</NextIntlClientProvider>
	);
}

function mockResponse(
	data: IJoke | undefined,
	error: Error | undefined,
	isLoading: boolean,
	isValidating: boolean
) {
	vi.mocked(useGetJoke).mockReturnValue({
		data,
		error,
		isLoading,
		isValidating,
		mutate: vi.fn()
	});
}
