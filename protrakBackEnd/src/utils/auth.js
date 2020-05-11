/*
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { logError } = require('./utils');

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getSigningKey = (header, cb) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
};

const options = {
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}`,
  algorithms: ['RS256'],
};

const readUserSession = event => {
  console.log('readUserSession...');

  const token = event.headers.authorization;
  let userSession;

  if (token) {
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, getSigningKey, options);
      userSession = {
        token: decodedToken,
        email: decodedToken.email,
        roles: decodedToken[`${process.env.AUTH0_NAMESPACE}/roles`],
      };
    } catch (e) {
      userSession = null;
      logError(event, e, 'readUserSession');
    }
  }

  return userSession;
};
*/

function readUserSession() {
  return undefined;
}

module.exports = {
  readUserSession,
};
