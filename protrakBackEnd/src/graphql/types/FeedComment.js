const { objectType } = require('@nexus/schema');

module.exports = {
  FeedComment: objectType({
    name: 'FeedComment',
    definition(t) {
      t.model.id();
      t.model.content();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
