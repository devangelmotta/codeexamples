const { extendType, stringArg } = require('@nexus/schema');

module.exports = {
  SupplierQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.supplier();
      t.crud.suppliers();

      t.field('countSuppliersByUser', {
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

          const suppliersCounter = (
            await Promise.all(
              companies.map(async company => {
                // TODO: Improve this query (Avoid fetch all table fields)
                return ctx.prisma.supplier.findMany({
                  where: { companyId: { id: { equals: company.id } } },
                });
              })
            )
          ).reduce((acum, curr) => {
            return acum + curr.length;
          }, 0);

          return suppliersCounter;
        },
      });
    },
  }),
};
