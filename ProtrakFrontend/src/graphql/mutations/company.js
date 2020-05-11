import gql from 'graphql-tag';

export const MUTATION_CREATE_COMPANY = gql`
  mutation MUTATION_CREATE_COMPANY(
    $name: String!
    $logo: String
    $logoName: String
    $logoThumb: String
    $status: String!
    $companyType: String
    $userId: String!
  ) {
    createOneCompany(
      name: $name
      logo: $logo
      logoName: $logoName
      logoThumb: $logoThumb
      status: $status
      companyType: $companyType
      userId: $userId
    ) {
      id
    }
  }
`;

export const MUTATION_CREATE_COMPANY_ADDRESS = gql`
  mutation MUTATION_CREATE_COMPANY_ADDRESS(
    $companyId: String!
    $addressOne: String!
    $addressTwo: String
    $addressType: AddressType
    $cityId: String!
    $stateId: String!
    $countryId: String!
    $postalCode: String!
  ) {
    createOneAddress(
      data: {
        addressOne: $addressOne
        addressTwo: $addressTwo
        type: $addressType
        cityId: { connect: { id: $cityId } }
        stateId: { connect: { id: $stateId } }
        countryId: { connect: { id: $countryId } }
        postalCode: $postalCode
        companies: { connect: { id: $companyId } }
      }
    ) {
      id
    }
  }
`;

export default {
  MUTATION_CREATE_COMPANY,
  MUTATION_CREATE_COMPANY_ADDRESS,
};
