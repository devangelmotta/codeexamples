const { extendType } = require('@nexus/schema');

module.exports = {
  ShareLinkQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.shareLink();
      t.crud.shareLinks();
    },
  }),
};
