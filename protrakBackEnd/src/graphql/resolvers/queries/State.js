const { extendType } = require('@nexus/schema');

module.exports = {
  StateQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.state();
      t.crud.states({ filtering: true });
    },
  }),
};
