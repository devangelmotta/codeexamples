const Validator = require('validatorjs');

function validateParams(data, rules) {
  const validation = new Validator(data, rules);
  if (!validation.passes()) throw new Error('Invalid params');
}

module.exports = {
  validateParams,
};
