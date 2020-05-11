const { extendType } = require('@nexus/schema');

module.exports = {
  SubscriptionDiscountQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.subscriptionDiscount();
      t.crud.subscriptionDiscounts();
    },
  }),
};
