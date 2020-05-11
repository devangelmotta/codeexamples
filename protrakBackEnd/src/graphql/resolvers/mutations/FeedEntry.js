const { extendType } = require('@nexus/schema');

module.exports = {
  FeedEntryMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneFeedEntry();
      t.crud.updateOneFeedEntry();
      t.crud.upsertOneFeedEntry();
      t.crud.deleteOneFeedEntry();
      t.crud.updateManyFeedEntry();
      t.crud.deleteManyFeedEntry();
    },
  }),
};
