const { extendType } = require('@nexus/schema');

module.exports = {
  CityMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneCity();
      t.crud.updateOneCity();
      t.crud.upsertOneCity();
      t.crud.deleteOneCity();
      t.crud.updateManyCity();
      t.crud.deleteManyCity();
    },
  }),
};
