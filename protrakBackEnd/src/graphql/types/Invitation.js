const { objectType } = require('@nexus/schema');

module.exports = {
  Invitation: objectType({
    name: 'Invitation',
    definition(t) {
      t.model.id();
      t.model.inviterUserId();
      t.model.email();
      t.model.phone();
      t.model.url();
      t.model.timesClicked();
      t.model.clickedMetaData();
      t.model.createdAt();
    },
  }),
};
