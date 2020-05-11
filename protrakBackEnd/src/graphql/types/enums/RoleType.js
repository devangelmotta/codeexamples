const { enumType } = require('@nexus/schema');

module.exports = {
  RoleType: enumType({
    name: 'RoleType',
    members: ['ROLE_TYPE_1', 'ROLE_TYPE_2', 'ROLE_TYPE_3'],
  }),
};
