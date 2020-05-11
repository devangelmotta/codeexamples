const { extendType } = require('@nexus/schema');

module.exports = {
  ContactMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneContact();
      t.crud.updateOneContact();
      t.crud.upsertOneContact();
      t.crud.deleteOneContact();
      t.crud.updateManyContact();
      t.crud.deleteManyContact();
    },
  }),
};
