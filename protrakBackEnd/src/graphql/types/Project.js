const { objectType } = require('@nexus/schema');

module.exports = {
  Project: objectType({
    name: 'Project',
    definition(t) {
      t.model.id();
      t.model.name();
      t.model.addressId();
      t.model.notes();
      t.model.companyId();
      t.model.suppliers();
      t.model.clients();
      t.model.projectBudgets();
      t.model.projectTimelines();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
