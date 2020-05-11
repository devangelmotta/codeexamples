import v8n from 'v8n';

export const isEmail = email => {
  // eslint-disable-next-line prefer-named-capture-group
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const isBoolean = value => {
  return typeof value === 'boolean';
};

export const isString = value => {
  return typeof value === 'string';
};

export const isFunction = value => {
  return typeof value === 'function';
};

export const isArray = value => {
  return Array.isArray(value);
};

export const isObject = value => {
  return value && typeof value === 'object' && isArray(value) === false;
};

export const isDate = (date, pattern = 'yyyy-mm-dd') => {
  let regex;

  if (pattern === 'dd-mm-yyyy') {
    // pattern: dd-mm-yyyy
    // eslint-disable-next-line prefer-named-capture-group
    regex = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;
  } else {
    // pattern: yyyy-mm-dd
    // eslint-disable-next-line prefer-named-capture-group
    regex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
  }

  return regex.test(date);
};

// --- Forms Validations ---

v8n.extend({
  email: () => {
    return value => isEmail(value);
  },
  password: () => {
    return value => value.length >= 3;
  },
  date: () => {
    return value => isDate(value);
  },
  dateLessThan: date => {
    return value => new Date(value) < new Date(date);
  },
  dateGreatherThan: date => {
    return value => new Date(value) > new Date(date);
  },
  phone: () => {
    return value => value.length >= 6;
  },
  noEmpty: () => {
    return value => value !== '';
  },
});

export const startDateValidation = (value, values) => {
  if (
    !v8n()
      .date()
      .test(value)
  ) {
    return 'Invalid date';
  }

  if (
    !v8n()
      .dateLessThan(values.endDate)
      .test(value)
  ) {
    return 'Start Date has to be less than End Date';
  }

  return true;
};

export const endDateValidation = (value, values) => {
  if (
    !v8n()
      .date()
      .test(value)
  ) {
    return 'Invalid date';
  }

  if (
    !v8n()
      .dateGreatherThan(values.startDate)
      .test(value)
  ) {
    return 'End Date has to be greater than Start Date';
  }

  return true;
};

export const validateInputRules = inputRules => values => {
  try {
    const errors = Object.entries(inputRules).reduce(
      (result, [inputName, inputConfig]) => {
        const isValidInput = inputConfig.isValid(values[inputName], values);
        if (isValidInput !== true) {
          // eslint-disable-next-line no-param-reassign
          result[inputName] = isValidInput || inputConfig.errorMessage;
        }

        return result;
      },
      {},
    );

    return errors;
  } catch (e) {
    console.log('ERROR: validateInputRules');
    console.log(e);
    console.log('');

    return Object.keys(inputRules).reduce((acum, inputName) => {
      // eslint-disable-next-line no-param-reassign
      acum[inputName] = 'Invalid value';

      return acum;
    }, {});
  }
};

export default {
  isArray,
  isBoolean,
  isEmail,
  isObject,
  isString,

  validateInputRules,
  startDateValidation,
  endDateValidation,
};
