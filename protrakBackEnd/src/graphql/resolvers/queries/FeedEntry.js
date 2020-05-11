const { extendType } = require('@nexus/schema');

module.exports = {
  FeedEntryQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.feedEntry();
      t.crud.feedEntries();
    },
  }),
};
