const { extendType } = require('@nexus/schema');

module.exports = {
  CompanyQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.company();
      t.crud.companies();
    },
  }),
};
