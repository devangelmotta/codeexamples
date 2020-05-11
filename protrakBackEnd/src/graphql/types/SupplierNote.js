const { objectType } = require('@nexus/schema');

module.exports = {
  SupplierNote: objectType({
    name: 'SupplierNote',
    definition(t) {
      t.model.id();
      t.model.supplierId();
      t.model.note();
      t.model.createdAt();
    },
  }),
};
