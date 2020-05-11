const { extendType } = require('@nexus/schema');

module.exports = {
  BillingProfileQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.billingProfile();
      t.crud.billingProfiles();
    },
  }),
};
