const { extendType, stringArg, intArg } = require('@nexus/schema');

module.exports = {
  ProposalQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.proposal();
      t.crud.proposals();

      t.field('countProposalsByUser', {
        type: 'Int',
        args: {
          userId: stringArg({ required: true }),
        },
        resolve: async (_, { userId }, ctx) => {
          // TODO: Improve this query (Avoid fetch all table fields)
          // Get all user proposals
          const proposals = await ctx.prisma.proposal.findMany({
            where: { proposalOwnerId: { id: { equals: userId } } },
          });

          return proposals.length;
        },
      });

      t.list.field('getClientProposalsByUser', {
        type: 'Proposal',
        args: {
          userId: stringArg({ required: true }),
          qty: intArg({ required: true }),
        },
        resolve: async (_, { userId, qty }, ctx) => {
          // TODO: Improve this query (Avoid fetch all table fields)
          // Get all user proposals
          const proposals = await ctx.prisma.proposal.findMany({
            where: { proposalOwnerId: { id: { equals: userId } }, supplierId: null },
            orderBy: { createdAt: 'desc' },
            first: qty,
          });

          return proposals;
        },
      });

      t.list.field('getSupplierProposalsByUser', {
        type: 'Proposal',
        args: {
          userId: stringArg({ required: true }),
          qty: intArg({ required: true }),
        },
        resolve: async (_, { userId, qty }, ctx) => {
          // Get all user proposals
          const proposals = await ctx.prisma.proposal.findMany({
            where: { proposalOwnerId: { id: { equals: userId } }, clientId: null },
            orderBy: { createdAt: 'desc' },
            first: qty,
          });

          return proposals;
        },
      });
    },
  }),
};
