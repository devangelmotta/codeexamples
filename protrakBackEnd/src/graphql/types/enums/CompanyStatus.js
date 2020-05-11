const { enumType } = require('@nexus/schema');

module.exports = {
  CompanyStatus: enumType({
    name: 'CompanyStatus',
    members: ['PENDING', 'APPROVED', 'DECLINED', 'OLD'],
  }),
};
