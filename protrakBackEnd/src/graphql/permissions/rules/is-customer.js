const { rule } = require('graphql-shield');

const isCustomer = rule({ cache: 'contextual' })((parent, args, ctx) => {
  return true;
});

module.exports = isCustomer;
