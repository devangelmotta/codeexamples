import { useCallback, useState, useRef, Fragment } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { Input, Separator, Select, Button } from '~/components/primitive';
import { FormModalContent } from '~/components/pages/_shared';
import { defaultDateToInput } from '~/utils/dates';

import {
  proposalToClientFormValidation,
  proposalToClientExtendedFormValidation,
} from './formConfig';

const ProposalToClientModalContent = ({ onCloseHandler }) => {
  const [isExtendedForm, setIsExtendedForm] = useState(false);

  const { current: clientOptions } = useRef([
    {
      value: '1',
      label: 'Client 1',
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

  const handleSwitchForm = useCallback(() => {
    setIsExtendedForm(!isExtendedForm);
  }, [isExtendedForm]);

  return (
    <FormModalContent
      titleIcon="folder-client"
      titleText={
        <Fragment>
          <span>Create Proposal</span>
          <span className="mx-2">-</span>
          <strong>Client</strong>
        </Fragment>
      }
    >
      <Formik
        validate={
          isExtendedForm
            ? proposalToClientExtendedFormValidation
            : proposalToClientFormValidation
        }
        initialValues={
          isExtendedForm
            ? {
                proposalName: '',
                clientName: '',
                clientEmail: '',
                clientPhone: '',
                budget: '',
                startDate: defaultDateToInput(),
                endDate: defaultDateToInput(dayjs().add(1, 'day')),
                proposalDetails: '',
              }
            : {
                proposalName: '',
                client: '',
                budget: '',
                startDate: defaultDateToInput(),
                endDate: defaultDateToInput(dayjs().add(1, 'day')),
                proposalDetails: '',
              }
        }
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
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <Input
                htmlAttrs={{
                  placeholder: 'Enter the name of the proposal here',
                  type: 'text',
                  name: 'proposalName',
                }}
                value={values.proposalName}
                error={touched.proposalName ? errors.proposalName : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Input
                icon={<img src="/static/images/icons/money-dark.svg" alt="Money icon" />}
                htmlAttrs={{
                  placeholder: 'Project budget',
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

              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-5/12">
                  {isExtendedForm ? (
                    <Input
                      icon={
                        <img src="/static/images/icons/user-dark.svg" alt="User icon" />
                      }
                      htmlAttrs={{
                        placeholder: 'Client Name',
                        name: 'clientName',
                        type: 'text',
                      }}
                      value={values.clientName || ''}
                      error={touched.clientName ? errors.clientName : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      showErrorMessage
                    />
                  ) : (
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
                  )}
                </div>
                <div className="flex flex-row w-full md:w-7/12 justify-between items-center mt-8 md:mt-0">
                  <div className="flex-1 text-left md:text-center text-gray-pt-200 text-lg font-thin">
                    Or
                  </div>
                  {isExtendedForm ? (
                    <Button
                      size="sm"
                      icon={
                        <img
                          src="/static/images/icons/user-white.svg"
                          alt="Client icon"
                        />
                      }
                      onClick={handleSwitchForm}
                    >
                      Select Client
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      icon={
                        <img src="/static/images/icons/plus-white.svg" alt="Plus icon" />
                      }
                      onClick={handleSwitchForm}
                    >
                      Add Client
                    </Button>
                  )}
                </div>
              </div>
              <Separator size={3} />

              {isExtendedForm && (
                <div className="flex flex-wrap">
                  <div className="w-full md:flex-1">
                    <Input
                      icon={
                        <img src="/static/images/icons/mail-dark.svg" alt="Email icon" />
                      }
                      htmlAttrs={{
                        placeholder: 'E-Mail',
                        name: 'clientEmail',
                        type: 'email',
                      }}
                      value={values.clientEmail || ''}
                      error={touched.clientEmail ? errors.clientEmail : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      showErrorMessage
                    />
                  </div>
                  <Separator responsive={[1, 3]} />
                  <div className="w-full md:flex-1">
                    <Input
                      icon={
                        <img src="/static/images/icons/phone-dark.svg" alt="Phone icon" />
                      }
                      htmlAttrs={{
                        placeholder: 'Phone',
                        name: 'clientPhone',
                        type: 'text',
                      }}
                      value={values.clientPhone || ''}
                      error={touched.clientPhone ? errors.clientPhone : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      showErrorMessage
                    />
                  </div>
                </div>
              )}
              <Separator size={3} />

              <div className="flex flex-wrap">
                <div className="w-full md:flex-1">
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
                <Separator responsive={[1, 3]} />
                <div className="w-full md:flex-1">
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
                  name: 'proposalDetails',
                  type: 'text',
                }}
                value={values.proposalDetails}
                error={touched.proposalDetails ? errors.proposalDetails : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />

              <FormModalContent.Footer
                isLoading={isSubmitting}
                isValid={isValid}
                mainActionText="Create"
                onMainActionHandler={handleSubmit}
                onCancelHandler={onCloseHandler}
              />
            </form>
          );
        }}
      </Formik>
    </FormModalContent>
  );
};

ProposalToClientModalContent.propTypes = {
  onCloseHandler: PropTypes.func.isRequired,
};

export default ProposalToClientModalContent;
