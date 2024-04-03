module.exports = {
  content: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'light-grey': '#E5EEE5',
      main: '#035151',
    },
    fontFamily: {
      sofiaRegular: ['SofiaProRegular', 'sans-serif'],
      sofiaRegularItalic: ['SofiaProRegularItalic', 'sans-serif'],
      sofiaMedium: ['SofiaProMedium', 'sans-serif'],
      sofiaMediumItalic: ['SofiaProMediumItalic', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
