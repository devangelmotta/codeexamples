const { extendType, stringArg } = require('@nexus/schema');

module.exports = {
  InvoiceQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.invoice();
      t.crud.invoices();

      t.field('countInvoicesByUser', {
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

          const incomingInvoicesCounter = (
            await Promise.all(
              proposals.map(proposal => {
                // TODO: Improve this query (Avoid fetch all table fields)
                return ctx.prisma.invoice.findMany({
                  where: { proposalId: { id: { equals: proposal.id } } },
                });
              })
            )
          ).reduce((acum, curr) => {
            return acum + curr.length;
          }, 0);

          // TODO: Improve this query (Avoid fetch all table fields)
          const outcomingInvoicesCounter = (
            await ctx.prisma.invoice.findMany({
              where: { invoiceOwnerId: { id: { equals: userId } } },
            })
          ).length;

          return incomingInvoicesCounter + outcomingInvoicesCounter;
        },
      });

      t.field('getTotalEarningByUser', {
        type: 'Float',
        args: {
          userId: stringArg({ required: true }),
        },
        resolve: async (_, { userId }, ctx) => {
          // TODO: Improve this query (Avoid fetch all table fields)
          // Get all user companies
          const companies = await ctx.prisma.company.findMany({
            where: { userId: { id: { equals: userId } } },
          });

          // Get all projects from user companies
          const projects = (
            await Promise.all(
              companies.map(company => {
                // TODO: Improve this query (Avoid fetch all table fields)
                return ctx.prisma.project.findMany({
                  where: { companyId: { id: { equals: company.id } } },
                });
              })
            )
          ).reduce((acum, curr) => {
            return [...acum, ...curr];
          }, []);

          const totalEarnedByUser = (
            await Promise.all(
              projects.map(project => {
                // TODO: Improve this query (Avoid fetch all table fields)
                return ctx.prisma.projectBudget.findMany({
                  where: { projectId: { id: { equals: project.id } } },
                  last: 1,
                });
              })
            )
          ).reduce((acum, curr) => {
            return acum + (curr.length > 0 ? curr[0].amount : 0);
          }, 0);

          return totalEarnedByUser;
        },
      });
    },
  }),
};
