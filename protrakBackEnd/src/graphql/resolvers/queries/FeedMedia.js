const { extendType } = require('@nexus/schema');

module.exports = {
  FeedMediaQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.feedMedia();
      t.crud.feedMedias();
    },
  }),
};
