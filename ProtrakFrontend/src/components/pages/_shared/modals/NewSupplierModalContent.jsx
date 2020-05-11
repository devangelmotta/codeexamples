import { useCallback } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { Input, Separator } from '~/components/primitive';
import { FormModalContent } from '~/components/pages/_shared';

import { newSupplierFormValidation } from './formConfig';

const NewSupplierModalContent = ({ onCloseHandler }) => {
  const handleSubmitClick = useCallback((values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
      console.log(values);
    }, 1000);
  }, []);

  return (
    <FormModalContent titleIcon="suppliers-dark" titleText="Create a Supplier">
      <Formik
        validate={newSupplierFormValidation}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          details: '',
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
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <Input
                icon={
                  <img src="/static/images/icons/suppliers-dark.svg" alt="User icon" />
                }
                htmlAttrs={{
                  placeholder: 'Name',
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
              <div className="flex flex-wrap">
                <div className="w-full md:flex-1">
                  <Input
                    icon={
                      <img src="/static/images/icons/mail-dark.svg" alt="Email icon" />
                    }
                    htmlAttrs={{
                      placeholder: 'E-Mail',
                      name: 'email',
                      type: 'text',
                    }}
                    value={values.email}
                    error={touched.email ? errors.email : ''}
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
                      name: 'phone',
                      type: 'text',
                    }}
                    value={values.phone}
                    error={touched.phone ? errors.phone : ''}
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
                  placeholder: 'Application details',
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

NewSupplierModalContent.propTypes = {
  onCloseHandler: PropTypes.func.isRequired,
};

export default NewSupplierModalContent;
