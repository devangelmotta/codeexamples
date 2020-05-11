const { extendType } = require('@nexus/schema');

module.exports = {
  SupplierNoteQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.supplierNote();
      t.crud.supplierNotes();
    },
  }),
};
