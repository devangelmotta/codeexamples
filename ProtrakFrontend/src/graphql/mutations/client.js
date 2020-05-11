import gql from 'graphql-tag';

export const MUTATION_CREATE_CLIENT = gql`
  mutation MUTATION_CREATE_CLIENT(
    $nickname: String!
    $firstName: String!
    $lastName: String
    $email: String!
    $phone: String!
    $addressOne: String!
    $addressTwo: String
    $contactTypePhone: ContactType!
    $contactTypeEmail: ContactType!
  ) {
    createOneClient(
      data: {
        nickname: $nickname
        firstName: $firstName
        lastName: $lastName
        contacts: {
          create: [
            { value: $phone, contactType: $contactTypePhone }
            { value: $email, contactType: $contactTypeEmail }
          ]
        }
        addresses: { create: { addressOne: $addressOne, addressTwo: $addressTwo } }
      }
    ) {
      id
    }
  }
`;

export default {
  MUTATION_CREATE_CLIENT,
};
