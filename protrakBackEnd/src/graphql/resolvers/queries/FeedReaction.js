const { extendType } = require('@nexus/schema');

module.exports = {
  FeedReactionQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.feedReaction();
      t.crud.feedReactions();
    },
  }),
};
