const { extendType } = require('@nexus/schema');

module.exports = {
  ContactQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.contact();
      t.crud.contacts();
    },
  }),
};
