const { objectType } = require('@nexus/schema');

module.exports = {
  Discount: objectType({
    name: 'Discount',
    definition(t) {
      t.model.id();
      t.model.discountCode();
      t.model.expirationDate();
      t.model.timesItCanBeUsed();
      t.model.createdAt();
    },
  }),
};
