const { extendType } = require('@nexus/schema');

module.exports = {
  ClientNoteMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneClientNote();
      t.crud.updateOneClientNote();
      t.crud.upsertOneClientNote();
      t.crud.deleteOneClientNote();
      t.crud.updateManyClientNote();
      t.crud.deleteManyClientNote();
    },
  }),
};
