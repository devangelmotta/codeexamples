import { Fragment } from 'react';

import { Button, Separator } from '~/components/primitive';
import { ProjectOptionsBox } from '~/components/pages/_shared';

import { useOnboardingContext, clearAndFinishOnboardingProcess } from '../context';

const CreateOptions = () => {
  const { steps, setCurrentStep } = useOnboardingContext();

  return (
    <Fragment>
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-stretch">
        <ProjectOptionsBox
          title="Create a Project"
          description="You can create a project you already have active and follow up."
          icon="blueprint"
          onClickHandler={() => {
            setCurrentStep(steps.CREATE_PROJECT);
          }}
        />
        <Separator responsive={[2, 2]} />
        <ProjectOptionsBox
          title="Create a Proposal"
          description="Or you can create a budget to send to a client and start a project."
          icon="worker"
          onClickHandler={() => {
            setCurrentStep(steps.CREATE_PROPOSAL);
          }}
        />
      </div>
      <div className="text-center">
        <Button
          className="w-full md:w-auto mt-12"
          size="sm"
          onClick={clearAndFinishOnboardingProcess}
        >
          Go to Dashboard
        </Button>
      </div>
    </Fragment>
  );
};

export default CreateOptions;
