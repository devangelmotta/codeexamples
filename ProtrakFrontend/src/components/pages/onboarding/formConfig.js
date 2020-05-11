import v8n from 'v8n';
import {
  validateInputRules,
  startDateValidation,
  endDateValidation,
} from '~/utils/validations';

const companyNameInputsRules = {
  name: {
    errorMessage: 'Name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
};

export const companyNameFormValidation = validateInputRules(companyNameInputsRules);

const companyAddressInputRules = {
  address: {
    errorMessage: 'Address is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  postalCode: {
    errorMessage: 'Postal Code is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  city: {
    errorMessage: 'City is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  state: {
    errorMessage: 'State is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  country: {
    errorMessage: 'Country is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
};

export const companyAddressFormValidation = validateInputRules(companyAddressInputRules);

const projectInputsRules = {
  name: {
    errorMessage: 'Name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  budget: {
    errorMessage: 'Budget is required',
    required: true,
    isValid: value => {
      return v8n()
        .number()
        .greaterThan(0)
        .test(value);
    },
  },
  startDate: {
    errorMessage: 'Invalid date',
    required: true,
    isValid: startDateValidation,
  },
  endDate: {
    errorMessage: 'Invalid date',
    required: true,
    isValid: endDateValidation,
  },
  notes: {
    errorMessage: 'Notes is required',
    required: false,
    isValid: value => {
      return v8n()
        .string()
        .test(value);
    },
  },
};

export const projectFormValidation = validateInputRules(projectInputsRules);

const clientInputsRules = {
  nickname: {
    errorMessage: 'Nickname is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
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
  phone: {
    errorMessage: 'Invalid phone',
    required: true,
    isValid: value => {
      return v8n()
        .phone()
        .test(value);
    },
  },
  addressLine: {
    errorMessage: 'Address is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  addressLine2: {
    errorMessage: 'Invalid Address Line 2',
    required: false,
    isValid: value => {
      return v8n()
        .string()
        .test(value);
    },
  },
};

export const clientFormValidation = validateInputRules(clientInputsRules);

const proposalInputRules = {
  name: {
    errorMessage: 'Name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  price: {
    errorMessage: 'Price is required',
    required: true,
    isValid: value => {
      return v8n()
        .number()
        .greaterThan(0)
        .test(value);
    },
  },
  startDate: {
    errorMessage: 'Invalid date',
    required: true,
    isValid: startDateValidation,
  },
  endDate: {
    errorMessage: 'Invalid date',
    required: true,
    isValid: endDateValidation,
  },
  notes: {
    errorMessage: 'Invalid Notes',
    required: false,
    isValid: value => {
      return v8n()
        .string()
        .test(value);
    },
  },
};

export const proposalFormValidation = validateInputRules(proposalInputRules);
