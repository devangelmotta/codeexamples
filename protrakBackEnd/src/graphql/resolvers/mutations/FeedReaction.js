const { extendType } = require('@nexus/schema');

module.exports = {
  FeedReactionMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneFeedReaction();
      t.crud.updateOneFeedReaction();
      t.crud.upsertOneFeedReaction();
      t.crud.deleteOneFeedReaction();
      t.crud.updateManyFeedReaction();
      t.crud.deleteManyFeedReaction();
    },
  }),
};
