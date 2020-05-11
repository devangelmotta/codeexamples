import { useCallback, useEffect, useState, useRef } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Input, Separator, Select, Button } from '~/components/primitive';
import { FormModalContent } from '~/components/pages/_shared';

import { defaultDateToInput, dateWithoutTime } from '~/utils/dates';
import { USER_ID } from '~/utils/constants';
import { QUERY_USER_COMPANIES, QUERY_CLIENTS_BY_USER } from '~/graphql/queries/project';
import {
  MUTATION_CREATE_PROJECT_WITH_NEW_CLIENT,
  MUTATION_CREATE_PROJECT_WITH_CLIENT,
} from '~/graphql/mutations/project';

import { newProjectFormValidation, newProjectFormExtendedValidation } from './formConfig';

const NewProjectModalContent = ({ onCloseHandler }) => {
  const { current: initialFormValues } = useRef({
    name: '',
    budget: '',
    startDate: defaultDateToInput(),
    endDate: defaultDateToInput(dayjs().add(1, 'day')),
    details: '',
    client: '',
  });
  const [isExtendedForm, setIsExtendedForm] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [clients, setClients] = useState([]);

  const {
    data: dataCompanies,
    loading: loadingCompanies,
    error: errorCompanies,
  } = useQuery(QUERY_USER_COMPANIES, {
    variables: { userId: USER_ID },
  });
  const { data: dataClients, loading: loadingClients, error: errorClients } = useQuery(
    QUERY_CLIENTS_BY_USER,
    {
      variables: { userId: USER_ID },
    },
  );

  useEffect(() => {
    if (dataCompanies === undefined) return;

    if (!loadingCompanies && errorCompanies) {
      alert('Error'); // TODO: Implement a Toast component
      console.trace(errorCompanies);
      return;
    }

    setCompanyId(
      dataCompanies.companies.length > 0 ? dataCompanies.companies[0].id : null,
    );
  }, [dataCompanies]);

  useEffect(() => {
    if (dataClients === undefined) return;

    if (!loadingClients && errorClients) {
      alert('Error'); // TODO: Implement a Toast component
      console.trace(errorClients);
      return;
    }

    setClients(
      dataClients.getClientsByUser.map(client => {
        return {
          label: `${client.firstName ? client.firstName : ''}
            ${client.lastName ? client.lastName : ''}
            ${client.nickname ? client.nickname : ''}`,
          value: client.id,
        };
      }),
    );
  }, [dataClients]);

  const [createProject] = useMutation(
    isExtendedForm
      ? MUTATION_CREATE_PROJECT_WITH_NEW_CLIENT
      : MUTATION_CREATE_PROJECT_WITH_CLIENT,
  );

  const handleSubmitClick = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      try {
        await createProject({
          variables: {
            companyId,
            name: values.name,
            amount: values.budget,
            projectBudgetStatus: 'PENDING',
            projectTimelineStatus:
              new Date(values.startDate) > dateWithoutTime() ? 'IN_PROGRESS' : 'APPROVED',
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
            notes: values.details,
            ...(isExtendedForm
              ? {
                  clientName: values.clientName,
                  clientEmail: values.clientEmail,
                  clientPhone: values.clientPhone,
                  contactTypePhone: 'PHONE_NUMBER',
                  contactTypeEmail: 'EMAIL',
                }
              : {
                  clientId: values.client,
                }),
          },
        });

        resetForm();
        setSubmitting(false);
      } catch (e) {
        alert('Error'); // TODO: handleError
        console.trace(e);
      }
    },
    [companyId, isExtendedForm],
  );

  const handleSwitchForm = useCallback(() => {
    setIsExtendedForm(currentValue => !currentValue);
  }, []);

  return (
    <FormModalContent titleIcon="project-dark" titleText="Create a Project">
      <Formik
        validate={
          isExtendedForm ? newProjectFormExtendedValidation : newProjectFormValidation
        }
        initialValues={
          isExtendedForm
            ? {
                ...initialFormValues,
                clientName: '',
                clientEmail: '',
                clientPhone: '',
              }
            : initialFormValues
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
                  placeholder: 'Enter the project address or name',
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
                  placeholder: 'Budget approved',
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
                      options={clients}
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
                <Separator responsive={[1, 4]} />
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

NewProjectModalContent.propTypes = {
  onCloseHandler: PropTypes.func.isRequired,
};

export default NewProjectModalContent;
