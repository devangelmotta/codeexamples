const { extendType } = require('@nexus/schema');

module.exports = {
  ProjectTimelineQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.projectTimeline();
      t.crud.projectTimelines();
    },
  }),
};
