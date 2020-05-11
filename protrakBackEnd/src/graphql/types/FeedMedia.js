const { objectType } = require('@nexus/schema');

module.exports = {
  FeedMedia: objectType({
    name: 'FeedMedia',
    definition(t) {
      t.model.id();
      t.model.feedEntryId();
      t.model.mediaUrl();
      t.model.thumbUrl();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
