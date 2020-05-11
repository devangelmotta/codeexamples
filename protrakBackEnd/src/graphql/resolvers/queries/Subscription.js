const { extendType } = require('@nexus/schema');

module.exports = {
  SubscriptionQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.subscription();
      t.crud.subscriptions();
    },
  }),
};
