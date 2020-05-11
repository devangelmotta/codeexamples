const logError = (req, res, e) => {
  console.log('REQUEST FAILED =>', `${req.method} ${req.originalUrl}`);
  console.log(e);
  console.log({ body: req.body, params: req.params });
  console.log('');
};

const successResponse = (req, res, data = 'Success', config = {}) => {
  res.statusCode = config.statusCode || 200;
  res.setHeader('Content-Type', config.contentType || 'application/json');
  res.end(typeof data === 'object' ? JSON.stringify(data) : data);
};

const failResponse = (
  req,
  res,
  data = 'Something went wrong, please try again',
  config = {},
) => {
  logError(req, res, data);

  res.statusCode = config.statusCode || 500;
  res.setHeader('Content-Type', config.contentType || 'application/json');
  res.end(typeof data === 'object' ? JSON.stringify(data) : data);
};

module.exports = {
  successResponse,
  failResponse,
};
