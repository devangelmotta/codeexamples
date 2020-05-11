export const Routes = {
  HOME: '/',
  SIGN_IN: '/',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  CLIENTS: '/clients',
  PROPOSALS: '/proposals',
  PROPOSALS_CLIENTS: '/proposals/clients',
  PROPOSALS_SUPPLIERS: '/proposals/suppliers',
  PROJECT_DETAILS: id => `/projects/${id}`,
  PROPOSAL_CLIENTS_DETAILS: id => `/proposals/clients/${id}`,
  PROPOSAL_SUPPLIERS_DETAILS: id => `/proposals/suppliers/${id}`,
  CLIENT_DETAILS: id => `/clients/${id}`,
};

// TODO: Remove this
export let USER_ID = ''; // eslint-disable-line
export const updateUserId = userId => {
  USER_ID = userId;
  window.localStorage.setItem('user_id', userId);
};

export default { Routes, updateUserId, USER_ID };
