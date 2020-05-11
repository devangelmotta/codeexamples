const { objectType } = require('@nexus/schema');

module.exports = {
  ShareLink: objectType({
    name: 'ShareLink',
    definition(t) {
      t.model.id();
      t.model.url();
      t.model.senderUserId();
      t.model.timesClicked();
      t.model.clickedMetaData();
      t.model.projectId();
      t.model.invoiceId();
      t.model.proposalId();
      t.model.expiredAt();
      t.model.createdAt();
    },
  }),
};
