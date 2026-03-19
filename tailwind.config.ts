import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        panel: '#1A1A1A',
        accent: '#00FF87'
      }
    }
  },
  plugins: []
} satisfies Config;
