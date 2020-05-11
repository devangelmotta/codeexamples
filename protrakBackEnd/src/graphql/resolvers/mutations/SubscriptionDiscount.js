const { extendType } = require('@nexus/schema');

module.exports = {
  SubscriptionDiscountMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneSubscriptionDiscount();
      t.crud.updateOneSubscriptionDiscount();
      t.crud.upsertOneSubscriptionDiscount();
      t.crud.deleteOneSubscriptionDiscount();
      t.crud.updateManySubscriptionDiscount();
      t.crud.deleteManySubscriptionDiscount();
    },
  }),
};
