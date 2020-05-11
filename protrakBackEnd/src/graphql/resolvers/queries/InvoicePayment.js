const { extendType } = require('@nexus/schema');

module.exports = {
  InvoicePayment: extendType({
    type: 'Query',
    definition(t) {
      t.crud.invoicePayment();
      t.crud.invoicePayments();
    },
  }),
};
