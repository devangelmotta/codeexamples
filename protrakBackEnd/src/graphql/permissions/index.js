const { allow, shield, and } = require('graphql-shield');
/*
const isAuthenticated = require('./rules/is-authenticated');
const isContractor = require('./rules/is-contractor');
const isCustomer = require('./rules/is-customer');
const isSupplier = require('./rules/is-supplier');
*/

const permissions = shield(
  {
    Query: {
      '*': allow,
      /*
      addresses: isAuthenticated,
      companies: and(isAuthenticated, isContractor),
      */
    },
    Mutation: {
      '*': allow,
    },
  },
  {
    fallbackRule: allow,
    allowExternalErrors: true,
  }
);

module.exports = permissions;
