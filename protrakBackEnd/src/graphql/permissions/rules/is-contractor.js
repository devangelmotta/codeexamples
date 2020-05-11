const { rule } = require('graphql-shield');

const isContractor = rule({ cache: 'contextual' })((parent, args, ctx) => {
  return true;
});

module.exports = isContractor;
