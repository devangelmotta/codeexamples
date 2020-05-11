const { ApolloServer } = require('apollo-server-lambda');
const { applyMiddleware } = require('graphql-middleware');
const { schema } = require('./schema');
const { createContext } = require('./context');
const permissions = require('./permissions');

const schemaWithMiddlewares = applyMiddleware(schema, permissions);
const server = new ApolloServer({
  schema: schemaWithMiddlewares,
  context: createContext,
  formatError: err => {
    /*
    TODO: Handle errors here: Logging, custom format for the client responses
    SEE: https://www.apollographql.com/docs/apollo-server/data/errors/

    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }

    switch (type) {
      case 'Authentication':
        logError(type, message, additionalProperties);
        throw new AuthenticationError(message, additionalProperties);

      case 'Forbidden':
        logError(type, message, additionalProperties);
        throw new ForbiddenError(message, additionalProperties);

      case 'UserInput':
        logError(type, message, additionalProperties);
        throw new UserInputError(message, additionalProperties);

      default:
        logError('Apollo', message, additionalProperties);
        throw new ApolloError(message, additionalProperties);
    }
    */

    console.log(err);

    return err;
  },
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
