import type { Preview } from '@storybook/nextjs';
import '@styles/globals.css';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { createElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../messages/en.json';
import pl from '../messages/pl.json';

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: '^on.*'},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    globalTypes: {
        locale: {
            description: 'Language',
            toolbar: {
                title: 'Language',
                icon: 'globe',
                items: [{ value: 'pl', title: 'Polski' }, { value: 'en', title: 'English' }]
            }
        },
        theme: {
            description: 'Global theme for components',
            defaultValue: 'dark',
            toolbar: {
                // The label to show for this toolbar item
                title: 'Theme',
                icon: 'circlehollow',
                // Array of plain string values or MenuItem shape (see below)
                items: ['light', 'dark'],
                // Change title based on selected value
                dynamicTitle: true
            }
        },
        darkMode: {
            defaultValue: true, // Enable dark mode by default on all stories
        },
    },
    initialGlobals: { locale: 'pl' }
};

export const decorators = [
    (Story: () => ReturnType<typeof createElement>, context: { globals: { locale?: string } }) => {
        const locale = context.globals.locale === 'en' ? 'en' : 'pl';
        return createElement(NextIntlClientProvider, {
            locale,
            messages: locale === 'en' ? en : pl,
            timeZone: 'Europe/Warsaw'
        }, createElement(Story));
    },
    withThemeByDataAttribute({
        themes: {
            light: 'light',
            dark: 'dark'
        },
        defaultTheme: 'light',
        attributeName: 'data-mode'
    })
];

export default preview;
