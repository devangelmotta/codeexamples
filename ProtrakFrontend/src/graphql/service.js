import client from './client';
import { withDelay } from '~/utils/utils';

function GraphQLError(message, type, scope, cause) {
  this.name = 'GraphQLError';
  this.message = message.replace('GraphQL error: ', '');
  this.stack = new Error().stack;
  this.type = type;
  this.scope = scope;
  this.cause = cause;
}

GraphQLError.prototype = Object.create(Error.prototype);
GraphQLError.prototype.constructor = GraphQLError;

const createRequestDefaultOptions = opts => {
  return {
    errorPolicy: 'none',
    ...opts,
  };
};

const createGraphQLError = ({ message, graphQLErrors }) => {
  let type = '';
  let scope = '';
  let cause = '';

  if (graphQLErrors.length > 0) {
    const [error] = graphQLErrors;
    type = error.extensions.code || type;
    scope =
      (error.extensions.exception.data && error.extensions.exception.data.scope) || scope;
    cause =
      (error.extensions.exception.data && error.extensions.exception.data.cause) || cause;
  }

  return new GraphQLError(message, type, scope, cause);
};

const extractData = data => {
  const finalData = Object.values(data).reduce((result, value, index, array) => {
    if (array.length === 1) {
      return value;
    }

    return result;
  }, data);

  return finalData;
};

const resolveRequest = async request => {
  try {
    const data = await request;
    return extractData(data.data);
  } catch (e) {
    const error = e.graphQLErrors ? createGraphQLError(e) : e;
    throw error;
  }
};

export const query = gqlOpts => {
  return withDelay(
    resolveRequest(client.query(createRequestDefaultOptions(gqlOpts))),
    1000,
  ).catch(e => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(e);
      }, 1000);
    });
  });
};

export const mutation = gqlOpts => {
  return withDelay(
    resolveRequest(client.mutate(createRequestDefaultOptions(gqlOpts))),
    1000,
  ).catch(e => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(e);
      }, 1000);
    });
  });
};

export default {
  query,
  mutation,
};
