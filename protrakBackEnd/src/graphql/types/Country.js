const { objectType } = require('@nexus/schema');

module.exports = {
  Country: objectType({
    name: 'Country',
    definition(t) {
      t.model.id();
      t.model.name();
      t.model.states();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
