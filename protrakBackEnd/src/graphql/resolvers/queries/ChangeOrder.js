const { extendType } = require('@nexus/schema');

module.exports = {
  ChangeOrderQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.changeOrder();
      t.crud.changeOrders();
    },
  }),
};
