const { extendType } = require('@nexus/schema');

module.exports = {
  AddressQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.address();
      t.crud.addresses();
    },
  }),
};
