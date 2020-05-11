import { useCallback, useRef } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { Input, Separator, Select } from '~/components/primitive';
import { FormModalContent } from '~/components/pages/_shared';
import { defaultDateToInput } from '~/utils/dates';

import { editProposalFormValidation } from './formConfig';

const EditProposalModalContent = ({ onCloseHandler, proposal }) => {
  const { current: clientOptions } = useRef([
    {
      value: '1',
      label: proposal.clientName,
    },
    {
      value: '2',
      label: 'Client 2',
    },
    {
      value: '3',
      label: 'Client 3',
    },
  ]);

  const handleSubmitClick = useCallback((values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
      console.log(values);
    }, 1000);
  }, []);

  return (
    <FormModalContent titleIcon="folder-blue" titleText="Edit Proposal">
      <Formik
        validate={editProposalFormValidation}
        initialValues={{
          name: proposal.address,
          budget: proposal.estimatedCost,
          client: proposal.clientName,
          startDate: defaultDateToInput(proposal.startDate),
          endDate: defaultDateToInput(proposal.endDate),
          details: proposal.additionalInfo,
        }}
        onSubmit={handleSubmitClick}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          touched,
          values,
        }) => {
          return (
            <form
              className="root"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <Input
                htmlAttrs={{
                  placeholder: 'Enter the name of the proposal here',
                  type: 'text',
                  name: 'name',
                }}
                value={values.name}
                error={touched.name ? errors.name : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Input
                icon={<img src="/static/images/icons/money-dark.svg" alt="Money icon" />}
                htmlAttrs={{
                  placeholder: 'Budget',
                  name: 'budget',
                  type: 'number',
                }}
                value={values.budget}
                error={touched.budget ? errors.budget : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Select
                name="client"
                label="Select a Client"
                options={clientOptions}
                value={values.client || ''}
                onChange={handleChange}
                placeholder="Select a client"
                icon="user-dark"
                error={touched.client ? errors.client : ''}
                showErrorMessage
              />
              <Separator size={3} />

              <div className="flex sm:flex-row flex-col">
                <div className="w-full sm:flex-1">
                  <Input
                    icon={
                      <img
                        src="/static/images/icons/calendar-dark.svg"
                        alt="Calendar icon"
                      />
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
                <Separator responsive={[1, 4, 'sm']} />
                <div className="w-full sm:flex-1">
                  <Input
                    icon={
                      <img
                        src="/static/images/icons/calendar-dark.svg"
                        alt="Calendar icon"
                      />
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
                  name: 'details',
                  type: 'text',
                }}
                value={values.details}
                error={touched.details ? errors.details : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />

              <FormModalContent.Footer
                isLoading={isSubmitting}
                isValid={isValid}
                mainActionText="Update"
                onMainActionHandler={handleSubmit}
                onCancelHandler={onCloseHandler}
              />
            </form>
          );
        }}
      </Formik>

      <style jsx>
        {`
          /* Desktop */
          @media only screen and (min-width: 991px) {
            .root {
              width: 500px;
            }
          }
        `}
      </style>
    </FormModalContent>
  );
};

EditProposalModalContent.propTypes = {
  onCloseHandler: PropTypes.func.isRequired,
  proposal: PropTypes.shape({
    clientName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    estimatedCost: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditProposalModalContent;
