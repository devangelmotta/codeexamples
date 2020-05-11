import gql from 'graphql-tag';

export const QUERY_COUNTRIES = gql`
  query QUERY_COUNTRIES {
    countries {
      id
      name
    }
  }
`;

export default {
  QUERY_COUNTRIES,
};
