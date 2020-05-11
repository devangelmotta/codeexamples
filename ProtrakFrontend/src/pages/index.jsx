import { useCallback } from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';

import { Button, Checkbox, Input, Separator } from '~/components/primitive';
import { SimpleLayout } from '~/components/layout';
import {
  GoogleButton,
  logInFormValidation,
  signIn,
} from '~/components/pages/authentication';
import { Routes, updateUserId } from '~/utils/constants';

const Login = () => {
  const handleSubmitClick = useCallback(async values => {
    try {
      const user = await signIn(values);

      updateUserId(user.id);
      Router.push(Routes.ONBOARDING);
    } catch (e) {
      console.log(e);
      alert('Error'); // TODO: Implement a Toast component
    }
  }, []);

  return (
    <SimpleLayout>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
        validate={logInFormValidation}
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
                icon={<img src="/static/images/icons/email.svg" alt="Email icon" />}
                htmlAttrs={{ placeholder: 'Email', type: 'email', name: 'email' }}
                value={values.email}
                error={touched.email ? errors.email : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Input
                variant="pt-input--password"
                htmlAttrs={{
                  placeholder: 'Password',
                  type: 'password',
                  name: 'password',
                  autoComplete: 'username',
                }}
                value={values.password}
                error={touched.password ? errors.password : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />

              <div className="flex flex-row justify-between my-6">
                <Checkbox
                  name="rememberMe"
                  text="Remember me"
                  onChange={handleChange}
                  checked={values.rememberMe}
                />
                <Link href={Routes.FORGOT_PASSWORD}>
                  <a className="underline">Forgot?</a>
                </Link>
              </div>

              <div className="flex flex-wrap flex-row space-between">
                <div className="w-full md:flex-1">
                  <Button
                    className="w-full"
                    isLoading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                  >
                    Log In
                  </Button>
                </div>
                <Separator responsive={[1, 1]} />
                <div className="w-full md:flex-1">
                  <GoogleButton
                    className="w-full"
                    disabled={isSubmitting}
                    onClick={e => {
                      alert(e.currentTarget.innerText);
                    }}
                  />
                </div>
              </div>
            </form>
          );
        }}
      </Formik>

      <Separator size={6} color="gray" />

      <Button
        variant="pt-button--yellow"
        className="w-full"
        link={{ href: Routes.SIGN_UP }}
      >
        Create account
      </Button>
    </SimpleLayout>
  );
};

export default Login;
