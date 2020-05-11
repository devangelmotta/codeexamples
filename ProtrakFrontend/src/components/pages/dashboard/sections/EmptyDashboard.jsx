import { Fragment } from 'react';

import { Separator } from '~/components/primitive';
import { ProjectOptionsBox } from '~/components/pages/_shared';

const EmptyDashboard = () => {
  return (
    <Fragment>
      <h2 className="text-4xl font-bold text-center mb-10">Let&apos;s get started</h2>
      <div className="mx-auto flex flex-col items-center md:flex-row md:justify-center md:items-stretch">
        <ProjectOptionsBox
          title="Create a Project"
          description="You can create a project you already have active and follow up."
          icon="blueprint"
          onClickHandler={() => {}}
        />
        <Separator responsive={[2, 2]} />
        <ProjectOptionsBox
          title="Create a Proposal"
          description="Or you can create a budget to send to a client and start a project."
          icon="worker"
          onClickHandler={() => {}}
        />
      </div>
    </Fragment>
  );
};

export default EmptyDashboard;
