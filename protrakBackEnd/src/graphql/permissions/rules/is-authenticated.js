const { rule } = require('graphql-shield');

const isAuthenticated = rule({ cache: 'contextual' })((parent, args, ctx) => {
  return true;
});

module.exports = isAuthenticated;
