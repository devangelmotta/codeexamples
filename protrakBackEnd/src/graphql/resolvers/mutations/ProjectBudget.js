const { extendType } = require('@nexus/schema');

module.exports = {
  ProjectBudgetMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneProjectBudget();
      t.crud.updateOneProjectBudget();
      t.crud.upsertOneProjectBudget();
      t.crud.deleteOneProjectBudget();
      t.crud.updateManyProjectBudget();
      t.crud.deleteManyProjectBudget();
    },
  }),
};
