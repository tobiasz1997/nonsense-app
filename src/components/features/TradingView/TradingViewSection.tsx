import { useThemeContext } from '@providers/ThemeProvider';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

const WIDGET_SCRIPT_URL =
	'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
const SYMBOLS = {
	global: [
		{ s: 'NASDAQ:ANT', d: 'Anthropic' },
		{ s: 'NASDAQ:NVDA', d: 'NVIDIA' },
		{ s: 'NASDAQ:MSFT', d: 'Microsoft' },
		{ s: 'NASDAQ:META', d: 'Meta' },
		{ s: 'NASDAQ:GOOGL', d: 'Alphabet (A)' }
	],
	etf: [
		{ s: 'XETR:VWCE', d: 'Vanguard FTSE All-World UCITS ETF' },
		{ s: 'XETR:SXRV', d: 'iShares NASDAQ 100 UCITS ETF' },
		{ s: 'XETR:SXR8', d: 'iShares Core S&P 500 UCITS ETF' }
	],
	wig: [
		{ s: 'GPW:NTT', d: 'NTT System' },
		{ s: 'GPW:ASB', d: 'Asbis' },
		{ s: 'GPW:CBF', d: 'cyber_Folks' },
		{ s: 'GPW:ALE', d: 'Allegro' },
		{ s: 'GPW:CDR', d: 'CD Projekt' },
		{ s: 'GPW:JSW', d: 'JSW' },
		{ s: 'GPW:PZU', d: 'PZU' },
		{ s: 'GPW:XTB', d: 'XTB' },
		{ s: 'GPW:PKO', d: 'PKO BP' }
	]
};

const TradingViewSection = () => {
	const t = useTranslations('tradingView');
	const locale = useLocale();
	const [frameState, setFrameState] = useState<{
		document: string;
		status: 'ready' | 'error';
	} | null>(null);
	const frameRef = useRef<HTMLIFrameElement>(null);
	const { theme } = useThemeContext();

	const widgetLocale = locale === 'pl' ? 'pl' : 'en';
	const globalTitle = t('global');
	const etfTitle = t('etf');
	const wigTitle = t('wig');

	const configuration = JSON.stringify({
		colorTheme: theme,
		dateRange: '1M',
		locale: widgetLocale,
		isTransparent: true,
		showChart: true,
		showFloatingTooltip: true,
		showSymbolLogo: true,
		width: '100%',
		height: 550,
		tabs: [
			{ title: globalTitle, symbols: SYMBOLS.global },
			{ title: etfTitle, symbols: SYMBOLS.etf },
			{ title: wigTitle, symbols: SYMBOLS.wig }
		]
	}).replace(/</g, '\\u003c');
	const frameDocument = `<!doctype html>
<html lang="${widgetLocale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>html,body{margin:0;width:100%;height:100%;background:transparent;color-scheme:${theme}}.tradingview-widget-container,.tradingview-widget-container__widget{width:100%;height:100%}</style>
</head>
<body>
<div class="tradingview-widget-container">
<div class="tradingview-widget-container__widget"></div>
<script src="${WIDGET_SCRIPT_URL}" type="text/javascript" async onerror="parent.postMessage({type:'tradingview-embed-error'},'*')">${configuration}</script>
</div>
</body>
</html>`;
	const status =
		frameState?.document === frameDocument ? frameState.status : 'loading';

	useEffect(() => {
		const handleMessage = (event: MessageEvent<unknown>) => {
			if (event.source !== frameRef.current?.contentWindow) {
				return;
			}
			const data = event.data;
			if (
				typeof data === 'object' &&
				data !== null &&
				'type' in data &&
				data.type === 'tradingview-embed-error'
			) {
				setFrameState({ document: frameDocument, status: 'error' });
			}
		};

		window.addEventListener('message', handleMessage);
		return () => window.removeEventListener('message', handleMessage);
	}, [frameDocument]);

	return (
		<section
			className="w-full space-y-4 text-green-dark dark:text-pistachio"
			aria-label={t('title')}
		>
			<h2 className="text-xl font-bold text-orange sm:text-3xl">
				{t('title')}
			</h2>
			<div className="overflow-hidden rounded-2xl bg-pistachio p-3 shadow-xl dark:bg-zinc-800 sm:p-5">
				<div className="relative">
					{status === 'loading' && (
						<output className="absolute inset-0 flex items-center justify-center">
							{t('loading')}
						</output>
					)}
					{status === 'error' && (
						<p
							role="alert"
							className="absolute inset-0 flex items-center justify-center p-5 text-center"
						>
							{t('error')}
						</p>
					)}
					<iframe
						key={frameDocument}
						ref={frameRef}
						title={t('title')}
						srcDoc={frameDocument}
						onLoad={() =>
							setFrameState((current) =>
								current?.document === frameDocument &&
								current.status === 'error'
									? current
									: { document: frameDocument, status: 'ready' }
							)
						}
						onError={() =>
							setFrameState({ document: frameDocument, status: 'error' })
						}
						className="block h-[550px] w-full border-0"
					/>
				</div>
				<div className="tradingview-widget-copyright mt-3 text-center text-xs">
					<a
						href="https://www.tradingview.com/markets/"
						target="_blank"
						rel="noopener noreferrer nofollow"
						className="rounded underline focus-visible:outline-2 focus-visible:outline-offset-4"
					>
						{t('attribution')}
					</a>
				</div>
			</div>
		</section>
	);
};

export default TradingViewSection;
