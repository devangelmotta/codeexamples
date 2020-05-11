import getConfig from 'next/config';
import fetch from '~utils/fetch';

const { publicRuntimeConfig } = getConfig();

const resetPassword = values => {
  return fetch()
    .post(`${publicRuntimeConfig.API_URL}/auth/reset-password`, {
      body: values,
    })
    .json();
};

const signIn = values => {
  return fetch()
    .post(`${publicRuntimeConfig.API_URL}/auth/sign-in`, {
      body: values,
    })
    .json();
};

const signUp = values => {
  return fetch()
    .post(`${publicRuntimeConfig.API_URL}/auth/sign-up`, {
      body: values,
    })
    .json();
};

export { signIn, signUp, resetPassword };
