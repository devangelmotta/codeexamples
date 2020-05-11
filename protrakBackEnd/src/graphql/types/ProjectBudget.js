const { objectType } = require('@nexus/schema');

module.exports = {
  ProjectBudget: objectType({
    name: 'ProjectBudget',
    definition(t) {
      t.model.id();
      t.model.amount();
      t.model.status();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
