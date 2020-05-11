const { objectType } = require('@nexus/schema');

module.exports = {
  BillingProfile: objectType({
    name: 'BillingProfile',
    definition(t) {
      t.model.id();
      t.model.paymentMethodId();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
