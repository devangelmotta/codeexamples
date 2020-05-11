import { SimpleLayout } from '~/components/layout';
import { Loader } from '~/components/pages/_shared';
import {
  Welcome,
  CompanyName,
  CompanyAddress,
  CreateCompanySuccess,
  CreateOptions,
  CreateProject,
  CreateClient,
  CreateProposal,
  CreateProjectSuccess,
  OnboardingProvider,
} from '~/components/pages/onboarding';
import { useSwitchOptions } from '~/hooks';

const Onboarding = () => {
  const { options, selectedOption, setSelectedOption } = useSwitchOptions([
    'loading',
    'welcome',
    'company-name',
    'company-address',
    'create-company-success',
    'create-options',
    'create-project',
    'create-client',
    'create-proposal',
    'create-project-success',
  ]);

  return (
    <SimpleLayout withHeader>
      <OnboardingProvider steps={options} setCurrentStep={setSelectedOption}>
        {selectedOption === options.LOADING && <Loader isLoading />}
        {selectedOption === options.WELCOME && <Welcome />}
        {selectedOption === options.COMPANY_NAME && <CompanyName />}
        {selectedOption === options.COMPANY_ADDRESS && <CompanyAddress />}
        {selectedOption === options.CREATE_COMPANY_SUCCESS && <CreateCompanySuccess />}
        {selectedOption === options.CREATE_OPTIONS && <CreateOptions />}
        {selectedOption === options.CREATE_PROJECT && <CreateProject />}
        {selectedOption === options.CREATE_CLIENT && <CreateClient />}
        {selectedOption === options.CREATE_PROPOSAL && <CreateProposal />}
        {selectedOption === options.CREATE_PROJECT_SUCCESS && <CreateProjectSuccess />}
      </OnboardingProvider>
    </SimpleLayout>
  );
};

export default Onboarding;
