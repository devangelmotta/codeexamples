const { objectType } = require('@nexus/schema');

module.exports = {
  Referral: objectType({
    name: 'Referral',
    definition(t) {
      t.model.id();
      t.model.userId();
      t.model.referredEmail();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
