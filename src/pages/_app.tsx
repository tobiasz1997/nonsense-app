import type { AppProps } from 'next/app';
import { AppPage } from '@interfaces/appPage';
import { Provider } from 'react-redux';
import SWRProvider from '@providers/SWRProvider';
import Layout from '@components/layouts/Layout';
import store from '@store/store';
import '@styles/globals.css';
import ThemeProvider from '@providers/ThemeProvider';

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
