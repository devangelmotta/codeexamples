const { extendType } = require('@nexus/schema');

module.exports = {
  ShareLinkMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneShareLink();
      t.crud.updateOneShareLink();
      t.crud.upsertOneShareLink();
      t.crud.deleteOneShareLink();
      t.crud.updateManyShareLink();
      t.crud.deleteManyShareLink();
    },
  }),
};
