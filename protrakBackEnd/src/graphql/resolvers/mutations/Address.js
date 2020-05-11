const { extendType } = require('@nexus/schema');

module.exports = {
  AddressMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneAddress();
      t.crud.updateOneAddress();
      t.crud.upsertOneAddress();
      t.crud.deleteOneAddress();
      t.crud.updateManyAddress();
      t.crud.deleteManyAddress();
    },
  }),
};
