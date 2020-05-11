const { objectType } = require('@nexus/schema');

module.exports = {
  State: objectType({
    name: 'State',
    definition(t) {
      t.model.id();
      t.model.name();
      t.model.cities();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
