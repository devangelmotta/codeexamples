const { extendType } = require('@nexus/schema');

module.exports = {
  SubscriptionPaymentQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.subscriptionPayment();
      t.crud.subscriptionPayments();
    },
  }),
};
