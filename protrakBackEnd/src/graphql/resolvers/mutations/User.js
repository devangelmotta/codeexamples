const { extendType } = require('@nexus/schema');

module.exports = {
  UserMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneUser();
      t.crud.updateOneUser();
      t.crud.upsertOneUser();
      t.crud.deleteOneUser();
      t.crud.updateManyUser();
      t.crud.deleteManyUser();
    },
  }),
};
