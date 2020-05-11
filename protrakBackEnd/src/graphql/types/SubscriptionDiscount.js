const { objectType } = require('@nexus/schema');

module.exports = {
  SubscriptionDiscount: objectType({
    name: 'SubscriptionDiscount',
    definition(t) {
      t.model.id();
      t.model.subscriptionId();
      t.model.discountCode();
      t.model.discountAmount();
      t.model.timesUsed();
      t.model.createdAt();
    },
  }),
};
