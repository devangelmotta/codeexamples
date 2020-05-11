const { extendType } = require('@nexus/schema');

module.exports = {
  ClientNoteQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.clientNote();
      t.crud.clientNotes();
    },
  }),
};
