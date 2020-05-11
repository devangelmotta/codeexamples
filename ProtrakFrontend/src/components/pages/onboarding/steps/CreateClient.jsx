import { Fragment, useCallback } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

import { Input, Separator } from '~/components/primitive';
import { Loader } from '~/components/pages/_shared';
import { MUTATION_CREATE_PROJECT_CLIENT } from '~/graphql/mutations/project';
import { MUTATION_CREATE_CLIENT } from '~/graphql/mutations/client';

import Stepper from '../components/Stepper';
import { useOnboardingContext } from '../context';
import { clientFormValidation } from '../formConfig';

const CreateClient = () => {
  const {
    updateCreateClientForm,
    steps,
    setCurrentStep,
    formData,
  } = useOnboardingContext();
  const isProjectClient = !!formData.project.id;

  const [createClient, { loading }] = useMutation(
    isProjectClient ? MUTATION_CREATE_PROJECT_CLIENT : MUTATION_CREATE_CLIENT,
  );

  const handleSubmitClick = useCallback(async values => {
    try {
      const {
        data: { createOneClient: client },
      } = await createClient({
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
          projectId: isProjectClient ? formData.project.id : null,
        },
      });
      updateCreateClientForm(client);
      setCurrentStep(steps.CREATE_PROJECT_SUCCESS);
    } catch (e) {
      alert('Error'); // TODO: handleError
      console.trace(e);
    }
  }, []);

  return (
    <Fragment>
      <Loader isLoading={loading} />
      <Stepper.Title icon="user">Add Client</Stepper.Title>
      <Formik
        validate={clientFormValidation}
        initialValues={{
          nickname: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          addressLine: '',
          addressLine2: '',
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

              <Stepper.Footer
                currentStep={1}
                totalSteps={2}
                disableNextButton={!isValid}
                onNextButtonClick={handleSubmit}
                onSkipButtonClick={() => {
                  setCurrentStep(steps.CREATE_PROJECT_SUCCESS);
                }}
                showSkipButton
                showNextButton
              />
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default CreateClient;
