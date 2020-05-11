const { objectType } = require('@nexus/schema');

module.exports = {
  ChangeOrder: objectType({
    name: 'ChangeOrder',
    definition(t) {
      t.model.id();
      t.model.projectId();
      t.model.requestedByUserId();
      t.model.status();
      t.model.description();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
