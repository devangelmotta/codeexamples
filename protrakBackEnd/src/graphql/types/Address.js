const { objectType } = require('@nexus/schema');

module.exports = {
  Address: objectType({
    name: 'Address',
    definition(t) {
      t.model.id();
      t.model.type();
      t.model.addressOne();
      t.model.addressTwo();
      t.model.cityId();
      t.model.stateId();
      t.model.postalCode();
      t.model.countryId();
      t.model.companies();
      t.model.suppliers();
      t.model.clients();
      t.model.createdAt();
      t.model.updatedAt();
    },
  }),
};
