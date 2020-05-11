const { objectType } = require('@nexus/schema');

module.exports = {
  Contact: objectType({
    name: 'Contact',
    definition(t) {
      t.model.id();
      t.model.value();
      t.model.contactType();
      t.model.companies();
      t.model.suppliers();
      t.model.clients();
      t.model.createdAt();
    },
  }),
};
