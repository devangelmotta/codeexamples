const { objectType } = require('@nexus/schema');

module.exports = {
  Supplier: objectType({
    name: 'Supplier',
    definition(t) {
      t.model.id();
      t.model.name();
      t.model.userId();
      t.model.companyId();
      t.model.projects();
      t.model.contacts();
      t.model.addresses();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
