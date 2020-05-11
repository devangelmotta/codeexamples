const { extendType } = require('@nexus/schema');

module.exports = {
  UserNotificationQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.userNotification();
      t.crud.userNotifications();
    },
  }),
};
