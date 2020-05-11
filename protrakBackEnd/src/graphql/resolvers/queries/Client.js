const { extendType, stringArg } = require('@nexus/schema');

module.exports = {
  ClientQuery: extendType({
    type: 'Query',
    definition(t) {
      t.crud.client();
      t.crud.clients({ filtering: true, ordering: true });

      t.field('countClientsByUser', {
        type: 'Int',
        args: {
          userId: stringArg({ required: true }),
        },
        resolve: async (_, { userId }, ctx) => {
          // TODO: Improve this query (Avoid fetch all table fields)
          const clients = await ctx.prisma.client.findMany({
            where: { userId: { id: { equals: userId } } },
          });

          return clients.length;
        },
      });
    },
  }),
};
