const { objectType } = require('@nexus/schema');

module.exports = {
  ProjectTimeline: objectType({
    name: 'ProjectTimeline',
    definition(t) {
      t.model.id();
      t.model.startDate();
      t.model.endDate();
      t.model.status();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
