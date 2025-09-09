module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				'mobile-small': { max: '410px' },
				'mobile-tablet': { max: '1024px' },
				'tablets-mobile': { min: '576px', max: '992px' },
				'tablets-desktop': { min: '769px', max: '1024px' },
			},
		},
	},
	plugins: [],
}
