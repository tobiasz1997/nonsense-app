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
