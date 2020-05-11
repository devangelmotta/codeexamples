const { enumType } = require('@nexus/schema');

module.exports = {
  CompanyType: enumType({
    name: 'CompanyType',
    members: ['GC', 'GOVERNMENT', 'REMODELING', 'DESIGNER'],
  }),
};
