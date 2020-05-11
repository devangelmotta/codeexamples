import gql from 'graphql-tag';

export const QUERY_STATES_BY_COUNTRY = gql`
  query QUERY_STATES_BY_COUNTRY($countryId: String!) {
    states(where: { country: { id: { equals: $countryId } } }) {
      id
      name
    }
  }
`;

export default {
  QUERY_STATES_BY_COUNTRY,
};
