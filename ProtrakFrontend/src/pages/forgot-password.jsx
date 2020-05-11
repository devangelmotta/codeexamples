import { useCallback } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';

import { Button, Input, Separator } from '~/components/primitive';
import { SimpleLayout } from '~/components/layout';
import {
  resetPassword,
  forgotPasswordFormValidation,
} from '~/components/pages/authentication';

import { Routes } from '~/utils/constants';
import { useSwitchOptions } from '~/hooks';

const ForgotPassword = () => {
  const { options, selectedOption, setSelectedOption } = useSwitchOptions([
    'form',
    'success',
    'error',
  ]);

  const handleSubmitClick = useCallback(async values => {
    try {
      await resetPassword(values);
      setSelectedOption(options.SUCCESS);
    } catch (e) {
      console.log(e);
      setSelectedOption(options.ERROR);
    }
  }, []);

  return (
    <SimpleLayout>
      {selectedOption === options.FORM && (
        <div>
          <h3 className="text-gray-pt-300 text-3xl font-medium">Forgot Password?</h3>
          <p className="text-gray-pt-200 my-5">
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </p>
          <Formik
            initialValues={{ email: '' }}
            validate={forgotPasswordFormValidation}
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
                <form onSubmit={handleSubmit}>
                  <Input
                    icon={<img src="/static/images/icons/email.svg" alt="Email" />}
                    htmlAttrs={{ placeholder: 'Email', type: 'email', name: 'email' }}
                    value={values.email}
                    error={touched.email ? errors.email : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                  <Separator size={3} />
                  <Button
                    className="w-full"
                    isLoading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </form>
              );
            }}
          </Formik>

          <div className="text-center mt-5">
            <Link href={Routes.SIGN_IN}>
              <a className="underline text-gray-pt-300">Go to log in</a>
            </Link>
          </div>
        </div>
      )}

      {selectedOption === options.SUCCESS && (
        <div className="flex justify-center flex-col py-12">
          <img src="/static/images/icons/check.svg" alt="Success" className="mb-8 h-50" />
          <div className="text-center">
            <h3 className="text-gray-pt-300 text-xl sm:text-3xl font-medium">
              Ready! Check your email
            </h3>
            <p className="text-gray-pt-200 mt-5">
              We send your email a unique link, you have 10 minutes to reset your password
            </p>
          </div>
        </div>
      )}

      {selectedOption === options.ERROR && (
        <div className="flex justify-center items-center flex-col py-12">
          <img src="/static/images/icons/error.svg" alt="Error" className="w-50 h-50" />
          <h3 className="text-gray-pt-300 text-xl sm:text-3xl font-medium my-8">
            Ups! something&apos;s not right
          </h3>
          <Button
            className="mx-auto"
            size="sm"
            onClick={() => {
              setSelectedOption(options.FORM);
            }}
          >
            Try Again
          </Button>
        </div>
      )}
    </SimpleLayout>
  );
};

export default ForgotPassword;
