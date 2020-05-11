import { Fragment } from 'react';

import { Button } from '~/components/primitive';

import Stepper from '../components/Stepper';
import { clearAndFinishOnboardingProcess } from '../context';

const CreateProjectSuccess = () => {
  return (
    <Fragment>
      <img
        src="/static/images/icons/check.svg"
        className="mx-auto"
        alt="Project created"
      />
      <Stepper.SubText>
        Great! you&apos;re ready to start managing your projects.
      </Stepper.SubText>
      <Button
        size="sm"
        className="w-full md:w-1/3 mx-auto block mt-6"
        onClick={clearAndFinishOnboardingProcess}
      >
        Go To Dashboard
      </Button>
    </Fragment>
  );
};

export default CreateProjectSuccess;
