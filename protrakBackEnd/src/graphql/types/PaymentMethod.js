const { objectType } = require('@nexus/schema');

module.exports = {
  PaymentMethod: objectType({
    name: 'PaymentMethod',
    definition(t) {
      t.model.id();
      t.model.externalId();
      t.model.lastFour();
      t.model.vendor();
      t.model.createdAt();
    },
  }),
};
