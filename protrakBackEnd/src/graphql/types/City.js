const { objectType } = require('@nexus/schema');

module.exports = {
  City: objectType({
    name: 'City',
    definition(t) {
      t.model.id();
      t.model.name();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
