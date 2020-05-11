const { extendType } = require('@nexus/schema');

module.exports = {
  DiscountQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.discount();
      t.crud.discounts();
    },
  }),
};
