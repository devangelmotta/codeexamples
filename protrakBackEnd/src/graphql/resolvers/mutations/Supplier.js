const { extendType } = require('@nexus/schema');

module.exports = {
  SupplierMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneSupplier();
      t.crud.updateOneSupplier();
      t.crud.upsertOneSupplier();
      t.crud.deleteOneSupplier();
      t.crud.updateManySupplier();
      t.crud.deleteManySupplier();
    },
  }),
};
