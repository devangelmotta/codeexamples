const { extendType } = require('@nexus/schema');

module.exports = {
  ChangeOrderMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneChangeOrder();
      t.crud.updateOneChangeOrder();
      t.crud.upsertOneChangeOrder();
      t.crud.deleteOneChangeOrder();
      t.crud.updateManyChangeOrder();
      t.crud.deleteManyChangeOrder();
    },
  }),
};
