const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['class'],
	theme: {
		fontFamily: {
			sans: ['Lato', 'sans-serif'],
			serif: ['Playfair Display', 'serif'],
			mukta: ['Mukta', 'sans-serif']
		},
		colors: {
			transparent: colors.transparent,
			current: colors.current,
			black: colors.black,
			white: colors.white,
			zinc: colors.zinc,
			gray: colors.gray,
			cyan: colors.cyan,
			fuchsia: colors.fuchsia,
			pistachio: {
				DEFAULT: '#E1EEDD'
			},
			red: {
				DEFAULT: '#e54747'
			},
			green: {
				DEFAULT: '#90C661',
				dark: '#183A1D'
			},
			orange: {
				DEFAULT: '#F0A04B'
			},
			beige: {
				DEFAULT: '#FEFBE9'
			},
			yellow: {
				light: '#fde047',
				DEFAULT: '#F6C453'
			}
		},
		extend: {
			height: {
				18: '4.375rem',
				39: '8.75rem'
			},
			width: {
				13: '3.125rem',
				25: '6.25rem'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
