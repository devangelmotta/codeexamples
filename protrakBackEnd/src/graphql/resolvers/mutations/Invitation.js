const { extendType } = require('@nexus/schema');

module.exports = {
  InvitationMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneInvitation();
      t.crud.updateOneInvitation();
      t.crud.upsertOneInvitation();
      t.crud.deleteOneInvitation();
      t.crud.updateManyInvitation();
      t.crud.deleteManyInvitation();
    },
  }),
};
