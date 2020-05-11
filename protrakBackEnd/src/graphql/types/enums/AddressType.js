const { enumType } = require('@nexus/schema');

module.exports = {
  AddressType: enumType({
    name: 'AddressType',
    members: ['COMMERCIAL', 'RESIDENTIAL'],
  }),
};
