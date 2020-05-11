const fetch = require('../../utils/fetch');
const { failResponse, successResponse } = require('../../utils/responses');

exports.resetPassword = async (event, context, callback) => {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch()
      .post(`${process.env.AUTH0_DOMAIN}/dbconnections/change_password`, {
        body: {
          client_id: process.env.AUTH0_CLIENT_ID,
          connection: process.env.AUTH0_DATABASE_CONNECTION,
          email: body.email,
        },
      })
      .json();

    console.log(response);

    return successResponse(response);
  } catch (e) {
    return failResponse(callback, event, { data: e });
  }
};
