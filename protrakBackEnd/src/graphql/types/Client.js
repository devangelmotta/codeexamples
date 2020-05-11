const { objectType } = require('@nexus/schema');

module.exports = {
  Client: objectType({
    name: 'Client',
    definition(t) {
      t.model.id();
      t.model.nickname();
      t.model.firstName();
      t.model.lastName();
      t.model.userId();
      t.model.clientImg();
      t.model.clientThumb();
      t.model.projects();
      t.model.proposals();
      t.model.contacts();
      t.model.addresses();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
