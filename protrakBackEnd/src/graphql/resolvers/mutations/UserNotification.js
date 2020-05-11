const { extendType } = require('@nexus/schema');

module.exports = {
  UserNotificationMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneUserNotification();
      t.crud.updateOneUserNotification();
      t.crud.upsertOneUserNotification();
      t.crud.deleteOneUserNotification();
      t.crud.updateManyUserNotification();
      t.crud.deleteManyUserNotification();
    },
  }),
};
