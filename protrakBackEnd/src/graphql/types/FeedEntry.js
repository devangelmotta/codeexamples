const { objectType } = require('@nexus/schema');

module.exports = {
  FeedEntry: objectType({
    name: 'FeedEntry',
    definition(t) {
      t.model.id();
      t.model.projectId();
      t.model.title();
      t.model.body();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
