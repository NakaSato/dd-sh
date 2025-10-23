/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{js,jsx,ts,tsx,md,mdx}',
    './blog/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#e0f3e9',
          200: '#c1e7d3',
          300: '#a2dbbc',
          400: '#83cfa5',
          500: '#2e8555',
          600: '#29784c',
          700: '#277148',
          800: '#205d3b',
          900: '#164428',
        },
      },
      fontFamily: {
        mono: [
          'Courier New',
          'Courier',
          'SF Mono',
          'Monaco',
          'Cascadia Code',
          'Roboto Mono',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
  important: true,
  corePlugins: {
    preflight: false,
  },
};
