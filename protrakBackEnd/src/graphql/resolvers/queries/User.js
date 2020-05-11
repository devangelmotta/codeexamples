const { extendType } = require('@nexus/schema');

module.exports = {
  UserQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.user();
      t.crud.users({ filtering: true });
    },
  }),
};
