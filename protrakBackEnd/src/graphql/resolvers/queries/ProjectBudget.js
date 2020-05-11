const { extendType } = require('@nexus/schema');

module.exports = {
  ProjectBudgetQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.projectBudget();
      t.crud.projectBudgets();
    },
  }),
};
