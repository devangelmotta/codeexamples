import { useCallback } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { Input, Separator } from '~/components/primitive';
import { FormModalContent } from '~/components/pages/_shared';
import { MUTATION_CREATE_CLIENT } from '~/graphql/mutations/client';

import { clientFormValidation } from './formConfig';

const ClientModalContent = ({ onCloseHandler, variant, client }) => {
  const isCreateClientForm = variant === 'create';

  const [createClient] = useMutation(MUTATION_CREATE_CLIENT);

  const handleSubmitClick = useCallback(async (values, { setSubmitting, resetForm }) => {
    try {
      await createClient({
        variables: {
          nickname: values.nickname,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          addressOne: values.addressLine,
          addressTwo: values.addressLine2,
          contactTypePhone: 'PHONE_NUMBER',
          contactTypeEmail: 'EMAIL',
        },
      });
      resetForm();
      setSubmitting(false);
    } catch (e) {
      alert('Error'); // TODO: handleError
      console.trace(e);
    }
  }, []);

  return (
    <FormModalContent
      titleIcon="ic-account-circle-blue"
      titleText={isCreateClientForm ? 'New Client' : 'Edit Client'}
    >
      <Formik
        validate={clientFormValidation}
        initialValues={{
          nickname: client.nickname || '',
          firstName: client.firstName || '',
          lastName: client.lastName || '',
          email: client.email || '',
          phone: client.phone || '',
          addressLine: client.addressLine || '',
          addressLine2: client.addressLine2 || '',
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
              <Input
                htmlAttrs={{
                  placeholder: 'Nickname',
                  name: 'nickname',
                  type: 'text',
                }}
                icon={<img src="/static/images/icons/user.svg" alt="User icon" />}
                value={values.nickname}
                error={touched.nickname ? errors.nickname : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <div className="flex flex-wrap">
                <div className="w-full md:flex-1">
                  <Input
                    htmlAttrs={{
                      placeholder: 'First Name',
                      name: 'firstName',
                      type: 'text',
                    }}
                    icon={<img src="/static/images/icons/user.svg" alt="User icon" />}
                    value={values.firstName}
                    error={touched.firstName ? errors.firstName : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                </div>
                <Separator responsive={[1, 3]} />
                <div className="w-full md:flex-1">
                  <Input
                    htmlAttrs={{
                      placeholder: 'Last Name',
                      name: 'lastName',
                      type: 'text',
                    }}
                    icon={<img src="/static/images/icons/user.svg" alt="User icon" />}
                    value={values.lastName}
                    error={touched.lastName ? errors.lastName : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                </div>
              </div>
              <Separator size={3} />

              <div className="flex flex-wrap">
                <div className="w-full md:flex-1">
                  <Input
                    icon={<img src="/static/images/icons/email.svg" alt="Email icon" />}
                    htmlAttrs={{
                      type: 'email',
                      name: 'email',
                      placeholder: 'E-Mail',
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
                    icon={<img src="/static/images/icons/phone.svg" alt="Phone icon" />}
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
                htmlAttrs={{
                  placeholder: 'Address Line 1',
                  name: 'addressLine',
                  type: 'text',
                }}
                value={values.addressLine}
                error={touched.addressLine ? errors.addressLine : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Input
                htmlAttrs={{
                  placeholder: 'Address Line 2',
                  name: 'addressLine2',
                  type: 'text',
                }}
                value={values.addressLine2}
                error={touched.addressLine2 ? errors.addressLine2 : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />

              <FormModalContent.Footer
                isLoading={isSubmitting}
                isValid={isValid}
                mainActionText={isCreateClientForm ? 'Create' : 'Update'}
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

ClientModalContent.propTypes = {
  onCloseHandler: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['create', 'edit']).isRequired,
  client: PropTypes.shape({
    nickname: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    addressLine: PropTypes.string.isRequired,
    addressLine2: PropTypes.string,
  }),
};

ClientModalContent.defaultProps = {
  client: undefined,
};

export default ClientModalContent;
