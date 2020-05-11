const { extendType } = require('@nexus/schema');

module.exports = {
  CountryQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.country();
      t.crud.countries();
    },
  }),
};
