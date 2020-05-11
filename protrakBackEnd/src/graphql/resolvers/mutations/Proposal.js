const { extendType } = require('@nexus/schema');

module.exports = {
  ProposalMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneProposal();
      t.crud.updateOneProposal();
      t.crud.upsertOneProposal();
      t.crud.deleteOneProposal();
      t.crud.updateManyProposal();
      t.crud.deleteManyProposal();
    },
  }),
};
