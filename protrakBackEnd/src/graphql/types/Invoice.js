const { objectType } = require('@nexus/schema');

module.exports = {
  Invoice: objectType({
    name: 'Invoice',
    definition(t) {
      t.model.id();
      t.model.number();
      t.model.status();
      t.model.dueDate();
      t.model.notes();
      t.model.invoiceOwnerId();
      t.model.clientId();
      t.model.taxRate();
      t.model.projectId();
      t.model.proposalId();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
