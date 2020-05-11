const { extendType } = require('@nexus/schema');

module.exports = {
  ProjectTimelineMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneProjectTimeline();
      t.crud.updateOneProjectTimeline();
      t.crud.upsertOneProjectTimeline();
      t.crud.deleteOneProjectTimeline();
      t.crud.updateManyProjectTimeline();
      t.crud.deleteManyProjectTimeline();
    },
  }),
};
