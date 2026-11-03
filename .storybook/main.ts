import type { StorybookConfig } from '@storybook/nextjs';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';

const config: StorybookConfig = {
    staticDirs: ['../public'],
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-onboarding',
        '@storybook/addon-themes',
        'storybook-tailwind-dark-mode',
        '@storybook/addon-docs'
    ],

    framework: {
        name: '@storybook/nextjs',
        options: {}
    },

    webpackFinal: async (config) => {
        config.plugins ??= [];
        config.plugins.push(new webpack.NormalModuleReplacementPlugin(
            /^@providers\/ThemeProvider$/,
            fileURLToPath(new URL('./mocks/ThemeProvider.tsx', import.meta.url))
        ));

        return config;
    }
};
export default config;
