const { objectType } = require('@nexus/schema');

module.exports = {
  UserRole: objectType({
    name: 'UserRole',
    definition(t) {
      t.model.id();
      t.model.roleType();
      t.model.userId();
      t.model.companyId();
      t.model.projectId();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
