module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathPrefix: '~',
            rootPathSuffix: 'src',
          },
        ],
      },
    ],
  ].concat(
    process.env.PT_ENVIRONMENT === 'production' ? ['transform-remove-console'] : [],
  ),
};
