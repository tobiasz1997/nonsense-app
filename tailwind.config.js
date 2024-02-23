const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['class', '[data-mode="dark"]'],
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
				DEFAULT: '#F6C453'
			}
		},
		extend: {}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp')
	]
};
