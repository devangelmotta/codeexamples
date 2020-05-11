const { extendType } = require('@nexus/schema');

module.exports = {
  ReferralMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneReferral();
      t.crud.updateOneReferral();
      t.crud.upsertOneReferral();
      t.crud.deleteOneReferral();
      t.crud.updateManyReferral();
      t.crud.deleteManyReferral();
    },
  }),
};
