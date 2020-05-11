const { extendType } = require('@nexus/schema');

module.exports = {
  CountryMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneCountry();
      t.crud.updateOneCountry();
      t.crud.upsertOneCountry();
      t.crud.deleteOneCountry();
      t.crud.updateManyCountry();
      t.crud.deleteManyCountry();
    },
  }),
};
