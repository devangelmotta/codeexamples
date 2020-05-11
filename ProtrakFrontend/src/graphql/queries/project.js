import gql from 'graphql-tag';

export const QUERY_USER_COMPANIES = gql`
  query QUERY_USER_COMPANIES($userId: String!) {
    companies(where: { userId: { id: { equals: $userId } } }) {
      id
    }
  }
`;

export const QUERY_CLIENTS_BY_USER = gql`
  query QUERY_CLIENTS_BY_USER($userId: String!) {
    getClientsByUser(userId: $userId) {
      id
      nickname
      firstName
      lastName
    }
  }
`;

export default {
  QUERY_USER_COMPANIES,
  QUERY_CLIENTS_BY_USER,
};
