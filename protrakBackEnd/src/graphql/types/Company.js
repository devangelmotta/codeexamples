const { objectType } = require('@nexus/schema');

module.exports = {
  Company: objectType({
    name: 'Company',
    definition(t) {
      t.model.id();
      t.model.name();
      t.model.logo();
      t.model.logoThumb();
      t.model.status();
      t.model.addresses();
      t.model.companyType();
      t.model.contacts();
      t.model.userId();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
