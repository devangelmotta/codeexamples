if (process.env.PT_ENVIRONMENT === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

module.exports = {
  webpack: config => {
    return config;
  },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    PT_ENVIRONMENT: process.env.PT_ENVIRONMENT,
  },
};
