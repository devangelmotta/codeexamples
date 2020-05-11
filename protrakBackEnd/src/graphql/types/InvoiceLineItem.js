const { objectType } = require('@nexus/schema');

module.exports = {
  InvoiceLineItem: objectType({
    name: 'InvoiceLineItem',
    definition(t) {
      t.model.id();
      t.model.description();
      t.model.unitPrice();
      t.model.quantity();
      t.model.amount();
      t.model.taxable();
      t.model.discount();
      t.model.invoiceId();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
