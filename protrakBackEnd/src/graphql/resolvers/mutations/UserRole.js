const { extendType } = require('@nexus/schema');

module.exports = {
  UserRoleMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneUserRole();
      t.crud.updateOneUserRole();
      t.crud.upsertOneUserRole();
      t.crud.deleteOneUserRole();
      t.crud.updateManyUserRole();
      t.crud.deleteManyUserRole();
    },
  }),
};
