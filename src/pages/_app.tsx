import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from '@components/layouts/Layout';
import { AppPage } from '@interfaces/appPage';
import SWRProvider from '@providers/SWRProvider';
import ThemeProvider from '@providers/ThemeProvider';
import store from '@store/store';
import '@styles/globals.css';

export default function App({
	Component,
	pageProps
}: AppProps & { Component: AppPage }) {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<SWRProvider>
					<Layout layoutType={Component.layoutType}>
						<Component {...pageProps} />
					</Layout>
				</SWRProvider>
			</ThemeProvider>
		</Provider>
	);
}
