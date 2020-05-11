const { extendType } = require('@nexus/schema');

module.exports = {
  CityQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.city();
      t.crud.cities({ filtering: true });
    },
  }),
};
