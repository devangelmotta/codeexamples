const { extendType } = require('@nexus/schema');

module.exports = {
  InvoiceMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneInvoice();
      t.crud.updateOneInvoice();
      t.crud.upsertOneInvoice();
      t.crud.deleteOneInvoice();
      t.crud.updateManyInvoice();
      t.crud.deleteManyInvoice();
    },
  }),
};
