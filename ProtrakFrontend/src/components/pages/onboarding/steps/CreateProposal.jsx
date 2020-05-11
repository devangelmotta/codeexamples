import { Fragment, useCallback } from 'react';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/react-hooks';

import { Input, Separator } from '~/components/primitive';
import { Loader } from '~/components/pages/_shared';
import { defaultDateToInput } from '~/utils/dates';
import { USER_ID } from '~/utils/constants';
import { MUTATION_CREATE_PROPOSAL } from '~/graphql/mutations/proposal';

import Stepper from '../components/Stepper';
import { useOnboardingContext } from '../context';
import { proposalFormValidation } from '../formConfig';

const CreateProposal = () => {
  const { updateCreateProposalForm, steps, setCurrentStep } = useOnboardingContext();

  const [createProposal, { loading }] = useMutation(MUTATION_CREATE_PROPOSAL);

  const handleSubmitClick = useCallback(async values => {
    const {
      data: { createOneProposal: proposal },
    } = await createProposal({
      variables: {
        name: values.name,
        proposalOwnerId: USER_ID,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        budgetProposed: values.price,
        details: values.notes,
        status: 'PENDING',
      },
    });

    updateCreateProposalForm(proposal);
    setCurrentStep(steps.CREATE_CLIENT);
  }, []);

  return (
    <Fragment>
      <Loader isLoading={loading} />
      <Stepper.Title icon="folder-client">Create a Proposal - Client</Stepper.Title>
      <Formik
        validate={proposalFormValidation}
        initialValues={{
          name: '',
          price: 0,
          startDate: defaultDateToInput(),
          endDate: defaultDateToInput(dayjs().add(1, 'day')),
          notes: '',
        }}
        onSubmit={handleSubmitClick}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          touched,
          values,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input
                htmlAttrs={{
                  placeholder: 'Enter the name of the proposal here',
                  name: 'name',
                  type: 'text',
                }}
                value={values.name}
                error={touched.name ? errors.name : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Input
                icon={<img src="/static/images/icons/money-dark.svg" alt="money icon" />}
                htmlAttrs={{
                  placeholder: 'Estimated Price',
                  name: 'price',
                  type: 'number',
                }}
                value={values.price}
                label="Estimated Price"
                error={touched.price ? errors.price : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={4} />

              <div className="flex flex-wrap">
                <div className="w-full md:flex-1">
                  <Input
                    icon={
                      <img src="/static/images/icons/email.svg" alt="Calendar icon" />
                    }
                    label="Start Date"
                    htmlAttrs={{ type: 'date', name: 'startDate' }}
                    value={values.startDate}
                    error={touched.startDate ? errors.startDate : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                </div>
                <Separator responsive={[2, 4]} />
                <div className="w-full md:flex-1">
                  <Input
                    icon={
                      <img src="/static/images/icons/email.svg" alt="Calendar icon" />
                    }
                    label="End Date"
                    htmlAttrs={{ type: 'date', name: 'endDate' }}
                    value={values.endDate}
                    error={touched.endDate ? errors.endDate : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                </div>
              </div>
              <Separator size={3} />

              <Input
                variant="pt-input--textarea"
                htmlAttrs={{
                  placeholder: 'Notes',
                  name: 'notes',
                  type: 'text',
                }}
                value={values.notes}
                error={touched.notes ? errors.notes : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />

              <Stepper.Footer
                currentStep={1}
                totalSteps={2}
                disableNextButton={!isValid}
                onNextButtonClick={handleSubmit}
                showNextButton
              />
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default CreateProposal;
