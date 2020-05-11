const { extendType, stringArg, floatArg } = require('@nexus/schema');

module.exports = {
  ProjectMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.updateOneProject();
      t.crud.upsertOneProject();
      t.crud.deleteOneProject();
      t.crud.updateManyProject();
      t.crud.deleteManyProject();

      t.field('createOneProject', {
        type: 'Project',
        args: {
          name: stringArg({ required: true }),
          companyId: stringArg({ required: true }),
          amount: floatArg({ required: true }),
          projectBudgetStatus: stringArg({ required: true }),
          projectTimelineStatus: stringArg({ required: true }),
          startDate: stringArg({ required: true }),
          endDate: stringArg({ required: true }),
          notes: stringArg({ required: true }),
        },
        resolve: async (
          _,
          {
            name,
            companyId,
            amount,
            projectBudgetStatus,
            projectTimelineStatus,
            startDate,
            endDate,
            notes,
          },
          ctx
        ) => {
          return ctx.prisma.project.create({
            data: {
              name,
              companyId: { connect: { id: companyId } },
              notes,
              projectBudgets: {
                create: {
                  amount,
                  status: projectBudgetStatus,
                },
              },
              projectTimelines: {
                create: {
                  startDate,
                  endDate,
                  status: projectTimelineStatus,
                },
              },
            },
          });
        },
      });
    },
  }),
};
