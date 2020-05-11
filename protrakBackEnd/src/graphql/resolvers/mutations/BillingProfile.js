const { extendType } = require('@nexus/schema');

module.exports = {
  BillingProfileMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneBillingProfile();
      t.crud.updateOneBillingProfile();
      t.crud.upsertOneBillingProfile();
      t.crud.deleteOneBillingProfile();
      t.crud.updateManyBillingProfile();
      t.crud.deleteManyBillingProfile();
    },
  }),
};
