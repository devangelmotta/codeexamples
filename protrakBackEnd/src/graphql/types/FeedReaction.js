const { objectType } = require('@nexus/schema');

module.exports = {
  FeedReaction: objectType({
    name: 'FeedReaction',
    definition(t) {
      t.model.id();
      t.model.reactionType();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
