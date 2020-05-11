import gql from 'graphql-tag';

export const QUERY_CITIES_BY_STATES = gql`
  query QUERY_CITIES_BY_STATES($stateId: String!) {
    cities(where: { state: { id: { equals: $stateId } } }) {
      id
      name
    }
  }
`;

export default {
  QUERY_CITIES_BY_STATES,
};
