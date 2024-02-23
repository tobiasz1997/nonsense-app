import type { Preview } from '@storybook/react';
import '@styles/globals.css';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: '^on[A-Z].*'},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    globalTypes: {
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
    }
};

export const decorators = [
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
