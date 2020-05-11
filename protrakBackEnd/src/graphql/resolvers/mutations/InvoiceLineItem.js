const { extendType } = require('@nexus/schema');

module.exports = {
  InvoiceLineItemMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneInvoiceLineItem();
      t.crud.updateOneInvoiceLineItem();
      t.crud.upsertOneInvoiceLineItem();
      t.crud.deleteOneInvoiceLineItem();
      t.crud.updateManyInvoiceLineItem();
      t.crud.deleteManyInvoiceLineItem();
    },
  }),
};
