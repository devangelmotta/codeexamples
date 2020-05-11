module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: ['./src/components/**/*.jsx', './src/pages/**/*.jsx'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          },
        }
      : {}),
  },
};
