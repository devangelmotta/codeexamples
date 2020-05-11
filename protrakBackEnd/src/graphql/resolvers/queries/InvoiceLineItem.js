const { extendType } = require('@nexus/schema');

module.exports = {
  InvoiceLineItemQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.invoiceLineItem();
      t.crud.invoiceLineItems();
    },
  }),
};
