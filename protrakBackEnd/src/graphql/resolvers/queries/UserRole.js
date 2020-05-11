const { extendType } = require('@nexus/schema');

module.exports = {
  UserRoleQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.userRole();
      t.crud.userRoles();
    },
  }),
};
