const { objectType } = require('@nexus/schema');

module.exports = {
  InvoicePayment: objectType({
    name: 'InvoicePayment',
    definition(t) {
      t.model.id();
      t.model.invoiceId();
      t.model.paidByUserId();
      t.model.paidOnline();
      t.model.transactionId();
      t.model.createdAt();
    },
  }),
};
