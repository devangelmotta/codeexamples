import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: publicRuntimeConfig.GRAPHQL_SERVER_URL,
    fetch,
  }),
  onError: ({ graphQLErrors }) => {
    console.group('onError handler - ApolloClient');
    if (graphQLErrors) {
      // eslint-disable-next-line
      for (const err of graphQLErrors) {
        console.log(err);
      }
    }
    console.groupEnd('onError handler - ApolloClient');
    console.log('');
  },
});

export default client;
