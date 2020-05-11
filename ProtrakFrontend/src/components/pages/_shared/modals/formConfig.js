import v8n from 'v8n';
import {
  validateInputRules,
  startDateValidation,
  endDateValidation,
} from '~/utils/validations';

// --- Projects ---

const newProjectInputRules = {
  name: {
    errorMessage: 'Project name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  client: {
    errorMessage: 'A Client is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
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
  details: {
    required: false,
    isValid: value => {
      return v8n()
        .string()
        .test(value);
    },
  },
};

export const newProjectFormValidation = validateInputRules(newProjectInputRules);

const newProjectExtendedInputRules = {
  ...newProjectInputRules,
  clientName: {
    errorMessage: 'Name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  clientEmail: {
    errorMessage: 'Invalid email',
    required: true,
    isValid: value => {
      return v8n()
        .email()
        .test(value);
    },
  },
  clientPhone: {
    errorMessage: 'Phone is required',
    required: true,
    isValid: value => {
      return v8n()
        .phone()
        .test(value);
    },
  },
};

export const newProjectFormExtendedValidation = validateInputRules(
  newProjectExtendedInputRules,
);

const {
  name,
  client,
  startDate,
  endDate,
  ...updateBudgetInputRules
} = newProjectInputRules;

export const updateBudgetFormValidation = validateInputRules(updateBudgetInputRules);

// --- Proposal to Suppliers ---

const proposalToSupplierInputRules = {
  proposalName: {
    errorMessage: 'Proposal name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  supplier: {
    errorMessage: 'A Supplier is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .test(value);
    },
  },
  project: {
    errorMessage: 'A Project is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
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
  proposalDetails: {
    required: false,
    isValid: value => {
      return v8n()
        .string()
        .test(value);
    },
  },
};

export const proposalToSupplierFormValidation = validateInputRules(
  proposalToSupplierInputRules,
);

const { supplier, ...sharedProposalToSupplierInputRules } = proposalToSupplierInputRules;

const proposalToSupplierExtendedInputRules = {
  ...sharedProposalToSupplierInputRules,
  supplierName: {
    errorMessage: 'Name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  supplierEmail: {
    errorMessage: 'Invalid email',
    required: true,
    isValid: value => {
      return v8n()
        .email()
        .test(value);
    },
  },
  supplierPhone: {
    errorMessage: 'Phone is required',
    required: true,
    isValid: value => {
      return v8n()
        .phone()
        .test(value);
    },
  },
};

export const proposalToSupplierExtendedFormValidation = validateInputRules(
  proposalToSupplierExtendedInputRules,
);

// --- Proposals to Clients ---

const proposalToClientInputRules = {
  proposalName: {
    errorMessage: 'Proposal name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  client: {
    errorMessage: 'A Client is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
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
  proposalDetails: {
    required: false,
    isValid: value => {
      return v8n()
        .string()
        .test(value);
    },
  },
};

export const proposalToClientFormValidation = validateInputRules(
  proposalToClientInputRules,
);

const {
  client: proposalToClientClient,
  ...sharedProposalToClientInputRules
} = proposalToClientInputRules;

const proposalToClientExtendedInputRules = {
  ...sharedProposalToClientInputRules,
  clientName: {
    errorMessage: 'Name is required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  clientEmail: {
    errorMessage: 'Invalid email',
    required: true,
    isValid: value => {
      return v8n()
        .email()
        .test(value);
    },
  },
  clientPhone: {
    errorMessage: 'Phone is required',
    required: true,
    isValid: value => {
      return v8n()
        .phone()
        .test(value);
    },
  },
};

export const proposalToClientExtendedFormValidation = validateInputRules(
  proposalToClientExtendedInputRules,
);

// --- Proposals ---

export const editProposalFormValidation = validateInputRules(newProjectInputRules);

// --- Clients ---

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

// --- Suppliers ---

const { address, address2, ...sharedNewClientInputRules } = clientInputsRules;

const newSupplierInputRules = {
  ...sharedNewClientInputRules,
  details: {
    required: false,
    isValid: value => {
      return v8n()
        .string()
        .test(value);
    },
  },
};

export const newSupplierFormValidation = validateInputRules(newSupplierInputRules);
