const { extendType } = require('@nexus/schema');

module.exports = {
  InvoicePaymentMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneInvoicePayment();
      t.crud.updateOneInvoicePayment();
      t.crud.upsertOneInvoicePayment();
      t.crud.deleteOneInvoicePayment();
      t.crud.updateManyInvoicePayment();
      t.crud.deleteManyInvoicePayment();
    },
  }),
};
