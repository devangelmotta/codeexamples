const { extendType } = require('@nexus/schema');

module.exports = {
  DiscountMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneDiscount();
      t.crud.updateOneDiscount();
      t.crud.upsertOneDiscount();
      t.crud.deleteOneDiscount();
      t.crud.updateManyDiscount();
      t.crud.deleteManyDiscount();
    },
  }),
};
