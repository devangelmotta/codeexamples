const { extendType } = require('@nexus/schema');

module.exports = {
  FeedMediaMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneFeedMedia();
      t.crud.updateOneFeedMedia();
      t.crud.upsertOneFeedMedia();
      t.crud.deleteOneFeedMedia();
      t.crud.updateManyFeedMedia();
      t.crud.deleteManyFeedMedia();
    },
  }),
};
