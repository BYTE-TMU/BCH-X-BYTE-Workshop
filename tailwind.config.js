/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red:       '#C84B2F',
          redLight:  '#FAECE7',
          black:     '#1A1A1A',
          white:     '#FFFFFF',
          gray:      '#888780',
          grayLight: '#F5F4F0',
          border:    '#E0E0E0',
        },
        path: {
          both:         '#5B4FCF',
          bothLight:    '#EEEDFE',
          technical:    '#185FA5',
          techLight:    '#E6F1FB',
          nontech:      '#1D9E75',
          nontechLight: '#E1F5EE',
        },
        format: {
          live:          '#C84B2F',
          liveLight:     '#FAECE7',
          recorded:      '#185FA5',
          recordedLight: '#E6F1FB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      maxWidth: {
        content: '720px',
        wide:    '1100px',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
}
