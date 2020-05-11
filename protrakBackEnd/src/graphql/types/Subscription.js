const { objectType } = require('@nexus/schema');

module.exports = {
  Subscription: objectType({
    name: 'Subscription',
    definition(t) {
      t.model.id();
      t.model.companyId();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
