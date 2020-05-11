import { Fragment } from 'react';

import Stepper from '../components/Stepper';
import { useOnboardingContext } from '../context';

const Welcome = () => {
  const { steps, setCurrentStep } = useOnboardingContext();

  return (
    <Fragment>
      <img
        src="/static/images/pages/create-company/welcome.svg"
        className="mx-auto"
        alt="Company created"
      />
      <div className="text-center mt-6">
        <Stepper.MainText>Welcome to ProTrak</Stepper.MainText>
        <Stepper.SubText>
          The #1 building project management app worldwide
        </Stepper.SubText>
      </div>
      <Stepper.Footer
        currentStep={1}
        onNextButtonClick={() => {
          setCurrentStep(steps.COMPANY_NAME);
        }}
        showNextButton
        disableNextButton={false}
      />
    </Fragment>
  );
};

export default Welcome;
