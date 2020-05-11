const { extendType } = require('@nexus/schema');

module.exports = {
  PaymentMethodMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOnePaymentMethod();
      t.crud.updateOnePaymentMethod();
      t.crud.upsertOnePaymentMethod();
      t.crud.deleteOnePaymentMethod();
      t.crud.updateManyPaymentMethod();
      t.crud.deleteManyPaymentMethod();
    },
  }),
};
