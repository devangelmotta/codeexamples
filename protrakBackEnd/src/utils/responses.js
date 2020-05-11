function logError(event, data) {
  console.log('REQUEST FAILED =>', `${event.httpMethod} ${event.resource}`);
  console.log(data);
  console.log({ body: event.body, params: event.params });
  console.log('');
}

function failResponse(
  callback,
  event,
  { data = 'Something went wrong, please try again', statusCode = 500, headers = {} } = {}
) {
  logError(event, data);

  return {
    statusCode,
    body: typeof data === 'object' ? JSON.stringify(data) : data,
    headers: {
      'Content-Type': typeof data === 'object' ? 'application/json' : 'text/plain',
      ...headers,
    },
  };
}

function successResponse(data) {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}

module.exports = {
  failResponse,
  successResponse,
};
