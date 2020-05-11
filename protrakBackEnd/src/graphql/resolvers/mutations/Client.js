const { extendType } = require('@nexus/schema');

module.exports = {
  ClientMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneClient();
      t.crud.updateOneClient();
      t.crud.upsertOneClient();
      t.crud.deleteOneClient();
      t.crud.updateManyClient();
      t.crud.deleteManyClient();
    },
  }),
};
