const { objectType } = require('@nexus/schema');

module.exports = {
  User: objectType({
    name: 'User',
    definition(t) {
      t.model.id();
      t.model.firstName();
      t.model.lastName();
      t.model.userName();
      t.model.email();
      t.model.profileImg();
      t.model.profileThumb();
      t.model.auth0Id();
      t.model.socialSignIn();
      t.model.lastLogin();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
