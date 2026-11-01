/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519'
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        bengali: ['Noto Serif Bengali', 'serif'],
        devanagari: ['Noto Serif Devanagari', 'serif']
      }
    }
  },
  plugins: []
};
