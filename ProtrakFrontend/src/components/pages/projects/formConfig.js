import v8n from 'v8n';
import { validateInputRules } from '~/utils/validations';

const publicationInputsRules = {
  description: {
    errorMessage: 'Description required',
    required: true,
    isValid: value => {
      return v8n()
        .string()
        .noEmpty()
        .test(value);
    },
  },
  privacy: {
    errorMessage: 'Invalid privacy config',
    required: true,
    isValid: value => {
      return ['public', 'team', 'private'].includes(value);
    },
  },
  pinned: {
    required: true,
    isValid: value => {
      return v8n()
        .boolean()
        .test(value);
    },
  },
  images: {
    required: false,
    isValid: value => {
      return v8n()
        .array()
        .test(value);
    },
  },
};

export default validateInputRules(publicationInputsRules);
