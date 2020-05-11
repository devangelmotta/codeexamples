const { extendType } = require('@nexus/schema');

module.exports = {
  SubscriptionPaymentMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneSubscriptionPayment();
      t.crud.updateOneSubscriptionPayment();
      t.crud.upsertOneSubscriptionPayment();
      t.crud.deleteOneSubscriptionPayment();
      t.crud.updateManySubscriptionPayment();
      t.crud.deleteManySubscriptionPayment();
    },
  }),
};
