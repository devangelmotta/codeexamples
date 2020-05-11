const { extendType } = require('@nexus/schema');

module.exports = {
  SubscriptionMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneSubscription();
      t.crud.updateOneSubscription();
      t.crud.upsertOneSubscription();
      t.crud.deleteOneSubscription();
      t.crud.updateManySubscription();
      t.crud.deleteManySubscription();
    },
  }),
};
