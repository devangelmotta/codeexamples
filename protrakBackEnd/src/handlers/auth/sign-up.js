const { PrismaClient } = require('@prisma/client');

const { validateParams } = require('../../utils/validations');
const fetch = require('../../utils/fetch');
const { failResponse, successResponse } = require('../../utils/responses');

const rulesSignUp = {
  firstName: 'required|string',
  lastName: 'required|string',
  email: 'required|email',
  password: 'required|min:6',
  repeatPassword: 'required|min:6',
  acceptTerms: 'boolean',
};

exports.signUpEmailPassword = async (event, context, callback) => {
  try {
    const body = JSON.parse(event.body);
    validateParams({ ...body }, rulesSignUp);

    const auth0User = await fetch()
      .post(`${process.env.AUTH0_DOMAIN}/dbconnections/signup`, {
        body: {
          name: body.firstName,
          family_name: body.lastName,
          email: body.email,
          password: body.password,
          client_id: process.env.AUTH0_CLIENT_ID,
          connection: process.env.AUTH0_DATABASE_CONNECTION,
        },
      })
      .json();

    const userCreated = await createUser(body, auth0User._id);

    return successResponse(userCreated);
  } catch (e) {
    return failResponse(callback, event, { data: e });
  }
};

const createUser = (user, auth0Id) => {
  const prisma = new PrismaClient();

  return prisma.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      auth0Id,
    },
  });
};
