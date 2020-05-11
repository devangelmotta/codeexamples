const { extendType } = require('@nexus/schema');

module.exports = {
  ReferralQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.referral();
      t.crud.referrals();
    },
  }),
};
