import { useCallback, useRef, Fragment } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { Input, Separator, Dropdown } from '~/components/primitive';
import { FormModalContent } from '~/components/pages/_shared';
import { formatNumberToString } from '~/utils/utils';

import { updateBudgetFormValidation } from './formConfig';

const UpdateBudgetModalContent = ({ onCloseHandler, actualBudget, totalPaid }) => {
  const { current: currencyOptions } = useRef([
    {
      value: '1',
      label: 'USD',
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
    <Fragment>
      <Formik
        validate={updateBudgetFormValidation}
        initialValues={{
          budget: '',
          details: '',
        }}
        onSubmit={handleSubmitClick}
        enableReinitialize
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
              <div className="flex flex-wrap justify-start">
                <div className="flex flex-col justify-center">
                  <Input.Label color="gray">Budget Actual</Input.Label>
                  <p className="font-bold text-4xl md:text-5xl">{`${formatNumberToString(
                    actualBudget,
                  )}`}</p>
                </div>
                <Separator responsive={[4, 2]} orientation="v" color="gray" />
                <div className="flex flex-col justify-center">
                  <Input.Label color="gray">Total Paid</Input.Label>
                  <p className="font-bold text-4xl md:text-5xl">{`${formatNumberToString(
                    totalPaid,
                  )}`}</p>
                </div>
              </div>
              <Separator size={4} />

              <Input.Label color="gray">New Budget</Input.Label>
              <div className="flex flex-wrap">
                <div className="w-full sm:flex-1 sm:w-auto">
                  <Input
                    icon={
                      <img src="/static/images/icons/money-dark.svg" alt="Money icon" />
                    }
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
                </div>
                <Separator responsive={[2, 1, 'sm']} />
                <div className="w-full sm:w-auto flex-shrink-0 text-right">
                  <Dropdown
                    variant="pt-dropdown--light"
                    options={currencyOptions}
                    placeholder="USD"
                    orientation="right"
                    onOptionClickHandler={selectedOption =>
                      alert(`Selected option ${selectedOption} as currency!`)
                    }
                  />
                </div>
              </div>
              <Separator size={5} />

              <Input.Label color="gray">Notes</Input.Label>
              <Input
                variant="pt-input--textarea"
                htmlAttrs={{
                  placeholder:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
    </Fragment>
  );
};

UpdateBudgetModalContent.propTypes = {
  onCloseHandler: PropTypes.func.isRequired,
  actualBudget: PropTypes.number.isRequired,
  totalPaid: PropTypes.number.isRequired,
};

export default UpdateBudgetModalContent;
