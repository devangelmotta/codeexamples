import { Fragment, useCallback } from 'react';

import { Button } from '~/components/primitive';

import Stepper from '../components/Stepper';
import { useOnboardingContext } from '../context';

const CreateCompanySuccess = () => {
  const { steps, setCurrentStep } = useOnboardingContext();

  const handleFinishClick = useCallback(() => {
    setCurrentStep(steps.CREATE_OPTIONS);
  }, []);

  return (
    <Fragment>
      <img
        src="/static/images/pages/create-company/success.svg"
        className="mx-auto"
        alt="Company created"
      />
      <Stepper.MainText>Your company has been created</Stepper.MainText>
      <Button
        size="sm"
        className="w-full md:w-1/3 mx-auto block mt-6"
        onClick={handleFinishClick}
      >
        Finish
      </Button>
    </Fragment>
  );
};

export default CreateCompanySuccess;
