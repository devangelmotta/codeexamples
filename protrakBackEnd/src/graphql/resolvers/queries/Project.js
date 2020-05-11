const { extendType, stringArg, intArg } = require('@nexus/schema');

module.exports = {
  ProjectQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.project();
      t.crud.projects({ filtering: true, ordering: true, pagination: true });

      t.field('countProjectsByUser', {
        type: 'Int',
        args: {
          userId: stringArg({ required: true }),
        },
        resolve: async (_, { userId }, ctx) => {
          // TODO: Improve this query (Avoid fetch all table fields)
          // Get all user companies
          const companies = await ctx.prisma.company.findMany({
            where: { userId: { id: { equals: userId } } },
          });

          // Count projects for all user companies
          const projectCounter = (
            await Promise.all(
              companies.map(async company => {
                // TODO: Improve this query (Avoid fetch all table fields)
                return ctx.prisma.project.findMany({
                  where: { companyId: { id: { equals: company.id } } },
                });
              })
            )
          ).reduce((acum, curr) => {
            return acum + curr.length;
          }, 0);

          return projectCounter;
        },
      });

      t.list.field('getProjectsByUser', {
        type: 'Project',
        args: {
          userId: stringArg({ required: true }),
          qty: intArg({ required: true }),
        },
        resolve: async (_, { userId, qty }, ctx) => {
          // TODO: Improve this query (Avoid fetch all table fields)
          // Get all user companies
          const companies = await ctx.prisma.company.findMany({
            where: { userId: { id: { equals: userId } } },
            orderBy: { createdAt: 'desc' },
            first: qty,
          });

          const projects = (
            await Promise.all(
              companies.map(company => {
                // TODO: Improve this query (Avoid fetch all table fields)
                return ctx.prisma.project.findMany({
                  where: { companyId: { id: { equals: company.id } } },
                  orderBy: { createdAt: 'desc' },
                  first: qty,
                });
              })
            )
          ).reduce((acum, curr) => {
            return [...acum, ...curr];
          }, []);

          return projects
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .slice(0, qty);
        },
      });
    },
  }),
};
