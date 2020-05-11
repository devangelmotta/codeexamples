const { objectType } = require('@nexus/schema');

module.exports = {
  SubscriptionPayment: objectType({
    name: 'SubscriptionPayment',
    definition(t) {
      t.model.id();
      t.model.subscriptionId();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
