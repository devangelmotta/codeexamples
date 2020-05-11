const { extendType } = require('@nexus/schema');

module.exports = {
  PaymentMethodQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.paymentMethod();
      t.crud.paymentMethods();
    },
  }),
};
