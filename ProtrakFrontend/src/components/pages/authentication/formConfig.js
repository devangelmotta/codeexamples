import v8n from 'v8n';
import { validateInputRules } from '~/utils/validations';

const logInInputsRules = {
  email: {
    errorMessage: 'Invalid email',
    required: true,
    isValid: value => {
      return v8n()
        .email()
        .test(value);
    },
  },
  password: {
    errorMessage: 'Invalid password',
    required: true,
    isValid: value => {
      return v8n()
        .password()
        .test(value);
    },
  },
};

export const logInFormValidation = validateInputRules(logInInputsRules);

const forgotPasswordInputsRules = {
  email: {
    errorMessage: 'Invalid email',
    required: true,
    isValid: value => {
      return v8n()
        .email()
        .test(value);
    },
  },
};

export const forgotPasswordFormValidation = validateInputRules(forgotPasswordInputsRules);

const changePasswordInputsRules = {
  newPassword: {
    errorMessage: 'Invalid password',
    required: true,
    isValid: value => {
      return v8n()
        .password()
        .test(value);
    },
  },
  repeatPassword: {
    required: true,
    isValid: (value, values) => {
      const isValid = v8n()
        .password()
        .test(value);

      if (!isValid) {
        return 'Invalid password';
      }

      if (value !== values.newPassword) {
        return "Passwords don't match";
      }

      return isValid;
    },
  },
};

export const changePasswordFormValidation = validateInputRules(changePasswordInputsRules);

const signUpInputsRules = {
  firstName: {
    errorMessage: 'First Name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  lastName: {
    errorMessage: 'Last Name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  email: {
    errorMessage: 'Invalid email',
    required: true,
    isValid: value => {
      return v8n()
        .email()
        .test(value);
    },
  },
  password: {
    errorMessage: 'Invalid password',
    required: true,
    isValid: value => {
      return v8n()
        .password()
        .test(value);
    },
  },
  repeatPassword: {
    required: true,
    isValid: (value, values) => {
      const isValid = v8n()
        .password()
        .test(value);

      if (!isValid) {
        return 'Invalid password';
      }

      if (value !== values.password) {
        return "Passwords don't match";
      }

      return isValid;
    },
  },
  acceptTerms: {
    errorMessage: 'Please accept the Terms of Service and Privacy Policy',
    required: true,
    isValid: value => {
      return value === true;
    },
  },
};

export const signUpFormValidation = validateInputRules(signUpInputsRules);
