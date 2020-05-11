import v8n from 'v8n';
import { validateInputRules } from '~/utils/validations';

const teamInputsRules = {
  fullname: {
    errorMessage: 'Full name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  email: {
    errorMessage: 'Email invalid',
    required: true,
    isValid: value => {
      return v8n()
        .email()
        .test(value);
    },
  },
  roleType: {
    errorMessage: 'Role type is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
};

export default validateInputRules(teamInputsRules);
