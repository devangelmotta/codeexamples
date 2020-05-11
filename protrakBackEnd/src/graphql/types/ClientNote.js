const { objectType } = require('@nexus/schema');

module.exports = {
  ClientNote: objectType({
    name: 'ClientNote',
    definition(t) {
      t.model.id();
      t.model.clientId();
      t.model.note();
      t.model.createdAt();
    },
  }),
};
