const { objectType } = require('@nexus/schema');

module.exports = {
  UserNotification: objectType({
    name: 'UserNotification',
    definition(t) {
      t.model.id();
      t.model.userId();
      t.model.title();
      t.model.description();
      t.model.new();
      t.model.archived();
      t.model.createdAt();
    },
  }),
};
