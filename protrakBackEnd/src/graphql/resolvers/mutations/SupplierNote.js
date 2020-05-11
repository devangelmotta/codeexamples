const { extendType } = require('@nexus/schema');

module.exports = {
  SupplierNoteMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneSupplierNote();
      t.crud.updateOneSupplierNote();
      t.crud.upsertOneSupplierNote();
      t.crud.deleteOneSupplierNote();
      t.crud.updateManySupplierNote();
      t.crud.deleteManySupplierNote();
    },
  }),
};
