// tailwind.config.js
const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          'pt-100': 'var(--gray-pt-100)',
          'pt-200': 'var(--gray-pt-200)',
          'pt-300': 'var(--gray-pt-300)',
          'pt-400': 'var(--gray-pt-400)',
          'pt-500': 'var(--gray-pt-500)',
          'pt-600': 'var(--gray-pt-600)',
          'pt-700': 'var(--gray-pt-700)',
        },
        yellow: {
          ...colors.yellow,
          'pt-100': 'var(--yellow-pt-100)',
          'pt-200': 'var(--yellow-pt-200)',
          'pt-300': 'var(--yellow-pt-300)',
          'pt-400': 'var(--yellow-pt-400)',
        },
        blue: {
          ...colors.blue,
          'pt-100': 'var(--blue-pt-100)',
          'pt-200': 'var(--blue-pt-200)',
          'pt-300': 'var(--blue-pt-300)',
        },
        green: {
          ...colors.green,
          'pt-100': 'var(--green-pt-100)',
          'pt-200': 'var(--green-pt-200)',
        },
        red: {
          ...colors.red,
          'pt-100': 'var(--red-pt-100)',
        },
      },
    },
  },
};
