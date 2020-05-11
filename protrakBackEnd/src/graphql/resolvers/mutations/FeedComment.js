const { extendType } = require('@nexus/schema');

module.exports = {
  FeedCommentMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneFeedComment();
      t.crud.updateOneFeedComment();
      t.crud.upsertOneFeedComment();
      t.crud.deleteOneFeedComment();
      t.crud.updateManyFeedComment();
      t.crud.deleteManyFeedComment();
    },
  }),
};
