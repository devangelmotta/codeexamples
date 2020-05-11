const { extendType, stringArg } = require('@nexus/schema');
const { uploadToS3 } = require('../../../utils/s3');

module.exports = {
  CompanyMutation: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.updateOneCompany();
      t.crud.upsertOneCompany();
      t.crud.deleteOneCompany();
      t.crud.updateManyCompany();
      t.crud.deleteManyCompany();

      t.field('createOneCompany', {
        type: 'Company',
        args: {
          name: stringArg({ nullable: false }),
          logo: stringArg({ nullable: true }),
          logoName: stringArg({ nullable: true }),
          logoThumb: stringArg({ nullable: true }),
          status: stringArg({ nullable: false }),
          companyType: stringArg({ nullable: true }),
          userId: stringArg({ nullable: false }),
        },
        resolve: async (
          _,
          { name, logo, logoName, logoThumb, status, companyType, userId },
          ctx
        ) => {
          let s3Image = { url: '' };

          if (logo && logoName) {
            s3Image = await uploadToS3(logo, logoName);
          }

          return ctx.prisma.company.create({
            data: {
              name,
              logo: s3Image.url,
              logoThumb,
              status,
              companyType,
              userId: { connect: { id: userId } },
            },
          });
        },
      });
    },
  }),
};
