const { rule } = require('graphql-shield');

const isSupplier = rule({ cache: 'contextual' })((parent, args, ctx) => {
  return true;
});

module.exports = isSupplier;
