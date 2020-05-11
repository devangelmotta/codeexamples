const { extendType } = require('@nexus/schema');

module.exports = {
  InvitationQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.invitation();
      t.crud.invitations();
    },
  }),
};
