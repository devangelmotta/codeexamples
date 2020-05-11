import { useCallback, useState, useRef, Fragment } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { Input, Separator, Select, Button } from '~/components/primitive';
import { FormModalContent } from '~/components/pages/_shared';
import { defaultDateToInput } from '~/utils/dates';

import {
  proposalToSupplierFormValidation,
  proposalToSupplierExtendedFormValidation,
} from './formConfig';

const ProposalToSupplierModalContent = ({ onCloseHandler }) => {
  const [isExtendedForm, setIsExtendedForm] = useState(false);

  const { current: supplierOptions } = useRef([
    {
      value: '1',
      label: 'Supplier 1',
    },
    {
      value: '2',
      label: 'Supplier 2',
    },
    {
      value: '3',
      label: 'Supplier 3',
    },
  ]);
  const { current: projectOptions } = useRef([
    {
      value: '1',
      label: 'Project 1',
    },
    {
      value: '2',
      label: 'Project 2',
    },
    {
      value: '3',
      label: 'Project 3',
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
    setIsExtendedForm(currentValue => !currentValue);
  }, []);

  return (
    <FormModalContent
      titleIcon="folder-suppliers"
      titleText={
        <Fragment>
          <span>Create Proposal</span>
          <span className="mx-2">-</span>
          <strong>Supplier</strong>
        </Fragment>
      }
    >
      <Formik
        validate={
          isExtendedForm
            ? proposalToSupplierExtendedFormValidation
            : proposalToSupplierFormValidation
        }
        initialValues={
          isExtendedForm
            ? {
                proposalName: '',
                supplierName: '',
                supplierEmail: '',
                supplierPhone: '',
                project: '',
                startDate: defaultDateToInput(),
                endDate: defaultDateToInput(dayjs().add(1, 'day')),
                proposalDetails: '',
              }
            : {
                proposalName: '',
                supplier: '',
                project: '',
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

              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-5/12">
                  {isExtendedForm ? (
                    <Input
                      icon={
                        <img
                          src="/static/images/icons/suppliers-dark.svg"
                          alt="User icon"
                        />
                      }
                      htmlAttrs={{
                        placeholder: 'Supplier Name',
                        name: 'supplierName',
                        type: 'text',
                      }}
                      value={values.supplierName || ''}
                      error={touched.supplierName ? errors.supplierName : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      showErrorMessage
                    />
                  ) : (
                    <Select
                      name="supplier"
                      placeholder="Select a supplier"
                      options={supplierOptions}
                      value={values.supplier}
                      icon="suppliers-dark"
                      error={touched.supplier ? errors.supplier : ''}
                      onChange={handleChange}
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
                          src="/static/images/icons/suppliers-white.svg"
                          alt="Supplier icon"
                        />
                      }
                      onClick={handleSwitchForm}
                    >
                      Select Supplier
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      icon={
                        <img src="/static/images/icons/plus-white.svg" alt="Plus icon" />
                      }
                      onClick={handleSwitchForm}
                    >
                      Add Supplier
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
                        name: 'supplierEmail',
                        type: 'text',
                      }}
                      value={values.supplierEmail || ''}
                      error={touched.supplierEmail ? errors.supplierEmail : ''}
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
                        name: 'supplierPhone',
                        type: 'text',
                      }}
                      value={values.supplierPhone || ''}
                      error={touched.supplierPhone ? errors.supplierPhone : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      showErrorMessage
                    />
                  </div>
                </div>
              )}
              <Separator size={3} />

              <Select
                name="project"
                placeholder="Select main project"
                options={projectOptions}
                value={values.project}
                icon="project-dark"
                error={touched.project ? errors.project : ''}
                onChange={handleChange}
                showErrorMessage
              />
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
                  placeholder: 'Proposal details',
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

ProposalToSupplierModalContent.propTypes = {
  onCloseHandler: PropTypes.func.isRequired,
};

export default ProposalToSupplierModalContent;
