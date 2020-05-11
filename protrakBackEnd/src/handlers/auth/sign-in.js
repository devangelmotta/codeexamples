const { PrismaClient } = require('@prisma/client');

const { validateParams } = require('../../utils/validations');
const fetch = require('../../utils/fetch');
const { failResponse, successResponse } = require('../../utils/responses');

const rulesSignIn = {
  email: 'required|email',
  password: 'required|min:6',
  rememberMe: 'boolean',
};

exports.signInWithEmailPassword = async (event, context, callback) => {
  try {
    const body = JSON.parse(event.body);
    validateParams({ ...body }, rulesSignIn);

    const auth0Tokens = await fetch()
      .post(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
        body: {
          grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          username: body.email,
          password: body.password,
          realm: process.env.AUTH0_DATABASE_CONNECTION,
          scope: 'openid profile email',
        },
      })
      .json();

    const auth0User = await fetch()
      .get(
        `${process.env.AUTH0_DOMAIN}/userinfo?access_token=${auth0Tokens.access_token}`
      )
      .json();

    const userInfo = await getUserInfo(auth0User.sub.replace('auth0|', ''));

    return successResponse(userInfo);
  } catch (e) {
    return failResponse(callback, event, { data: e });
  }
};

const getUserInfo = async auth0Id => {
  console.log('auth0Id ', auth0Id);
  const prisma = new PrismaClient();

  const user = await prisma.user.findOne({ where: { auth0Id } });

  if (!user) throw new Error('User not found');

  return user;
};
