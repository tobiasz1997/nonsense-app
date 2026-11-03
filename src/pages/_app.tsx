import type { AppProps } from 'next/app';
import Layout from '@components/layouts/Layout';
import { AppPage } from '@interfaces/appPage';
import LocaleProvider from '@providers/LocaleProvider';
import SWRProvider from '@providers/SWRProvider';
import ThemeProvider from '@providers/ThemeProvider';
import store from '@store/store';
import '@styles/globals.css';
import { Provider } from 'react-redux';

export default function App({
	Component,
	pageProps
}: AppProps & { Component: AppPage }) {
	return (
		<Provider store={store}>
			<LocaleProvider>
				<ThemeProvider>
					<SWRProvider>
						<Layout layoutType={Component.layoutType}>
							<Component {...pageProps} />
						</Layout>
					</SWRProvider>
				</ThemeProvider>
			</LocaleProvider>
		</Provider>
	);
}
