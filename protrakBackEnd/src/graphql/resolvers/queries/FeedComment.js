const { extendType } = require('@nexus/schema');

module.exports = {
  FeedCommentQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.feedComment();
      t.crud.feedComments();
    },
  }),
};
