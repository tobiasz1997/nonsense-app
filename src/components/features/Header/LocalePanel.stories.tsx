import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../../messages/en.json';
import pl from '../../../../messages/pl.json';
import LocalePanel from './LocalePanel';

type StoryArgs = {
	locale: 'pl' | 'en';
};

const meta = {
	title: 'Features/Locale panel',
	component: LocalePanel,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	args: {
		locale: 'pl'
	},
	argTypes: {
		locale: {
			control: 'inline-radio',
			options: ['pl', 'en'],
			description:
				'Selected language. Clicking a flag saves the language cookie and reloads the page.'
		}
	},
	render: ({ locale }) => (
		<NextIntlClientProvider
			key={locale}
			locale={locale}
			messages={locale === 'pl' ? pl : en}
			timeZone="Europe/Warsaw"
		>
			<div className="rounded-xl bg-pistachio p-8 dark:bg-zinc-800">
				<LocalePanel />
			</div>
		</NextIntlClientProvider>
	)
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { locale: 'pl' }
};
