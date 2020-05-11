const { objectType } = require('@nexus/schema');

module.exports = {
  Proposal: objectType({
    name: 'Proposal',
    definition(t) {
      t.model.id();
      t.model.name();
      t.model.projectId();
      t.model.supplierId();
      t.model.clientId();
      t.model.proposalOwnerId();
      t.model.startDate();
      t.model.endDate();
      t.model.budgetProposed();
      t.model.details();
      t.model.status();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
