import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { Routes } from '~/utils/constants';
import { componentDidMount } from '~/utils/utils';

const OnboardingContext = createContext();
const useOnboardingContext = () => useContext(OnboardingContext);
const LS_KEY_ONBOARDING_FORM_DATA = 'onboarding_form_data';
const LS_KEY_ONBOARDING_CURRENT_STEP = 'onboarding_current_step';

const getOnboardingProgress = () => {
  const onboardingFormData = window.localStorage.getItem(LS_KEY_ONBOARDING_FORM_DATA);
  const onboardingCurrentStep = window.localStorage.getItem(
    LS_KEY_ONBOARDING_CURRENT_STEP,
  );

  return {
    formData: onboardingFormData ? JSON.parse(onboardingFormData) : undefined,
    currentStep: onboardingCurrentStep,
  };
};

const clearAndFinishOnboardingProcess = () => {
  window.localStorage.removeItem(LS_KEY_ONBOARDING_FORM_DATA);
  window.localStorage.removeItem(LS_KEY_ONBOARDING_CURRENT_STEP);
  Router.push(Routes.DASHBOARD);
};

const OnboardingProvider = ({ children, steps, setCurrentStep: setCurrentStep_ }) => {
  const [formData, setFormData] = useState({
    company: {},
    project: {},
    client: {},
    proposal: {},
  });

  componentDidMount(() => {
    const onboardingProgress = getOnboardingProgress();

    if (onboardingProgress.formData) {
      setFormData(onboardingProgress.formData);
    }

    setCurrentStep_(onboardingProgress.currentStep || steps.WELCOME);
  });

  useEffect(() => {
    window.localStorage.setItem(LS_KEY_ONBOARDING_FORM_DATA, JSON.stringify(formData));
  }, [formData]);

  const setCurrentStep = useCallback(currentStep => {
    window.localStorage.setItem(LS_KEY_ONBOARDING_CURRENT_STEP, currentStep);
    setCurrentStep_(currentStep);
  }, []);

  const updateFormFunction = formName => updates => {
    setFormData({ ...formData, [formName]: { ...formData[formName], ...updates } });
  };

  const updateCreateCompanyForm = updateFormFunction('company');

  const updateCreateProjectForm = updateFormFunction('project');

  const updateCreateClientForm = updateFormFunction('client');

  const updateCreateProposalForm = updateFormFunction('proposal');

  return (
    <OnboardingContext.Provider
      value={{
        formData,
        updateCreateCompanyForm,
        updateCreateProjectForm,
        updateCreateClientForm,
        updateCreateProposalForm,
        steps,
        setCurrentStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

OnboardingProvider.propTypes = {
  children: PropTypes.node.isRequired,
  steps: PropTypes.shape({
    LOADING: PropTypes.string.isRequired,
    WELCOME: PropTypes.string.isRequired,
    COMPANY_NAME: PropTypes.string.isRequired,
    COMPANY_ADDRESS: PropTypes.string.isRequired,
    CREATE_COMPANY_SUCCESS: PropTypes.string.isRequired,
    CREATE_OPTIONS: PropTypes.string.isRequired,
    CREATE_PROJECT: PropTypes.string.isRequired,
    CREATE_CLIENT: PropTypes.string.isRequired,
    CREATE_PROPOSAL: PropTypes.string.isRequired,
    CREATE_PROJECT_SUCCESS: PropTypes.string.isRequired,
  }).isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export { useOnboardingContext, OnboardingProvider, clearAndFinishOnboardingProcess };
