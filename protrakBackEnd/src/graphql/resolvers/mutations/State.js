const { extendType } = require('@nexus/schema');

module.exports = {
  StateMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneState();
      t.crud.updateOneState();
      t.crud.upsertOneState();
      t.crud.deleteOneState();
      t.crud.updateManyState();
      t.crud.deleteManyState();
    },
  }),
};
