import PropTypes from 'prop-types';

import { MainLayout } from '~/components/layout';
import { EmptySection, Project, Section, SummaryBox } from '~/components/pages/_shared';

const Projects = ({ summary, projects }) => {
  return (
    <MainLayout pathname="projects">
      <div className="flex flex-wrap justify-between mb-2">
        {summary.map(({ icon, number, text }, index) => {
          return (
            <div
              className="summary-box__container w-1/2 md:w-1/3 p-1"
              key={`summary-box-${index}`}
            >
              <SummaryBox icon={icon} number={number} text={text} />
            </div>
          );
        })}
      </div>
      <Section title="Projects">
        {projects.length > 0 ? (
          <div className="flex flex-wrap">
            {projects.map((item, index) => {
              return (
                <div className="p-1" key={`project-box-${index}`}>
                  <Project.Box
                    id={item.id}
                    address={item.address}
                    name={item.name}
                    budget={item.budget}
                    budgetUpdatedDate={item.budgetUpdatedDate}
                    totalPaid={item.totalPaid}
                    pendingPayment={item.pendingPayment}
                    budgetChanged={item.budgetChanged}
                    createdDate={item.createdDate}
                    daysLeft={item.daysLeft}
                    percentageProgress={item.percentageProgress}
                    projectStatus={item.projectStatus}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptySection
            icon="project-blue"
            text="You can create a new Project."
            button="Create new Project"
            onClick={() => {}}
          />
        )}
      </Section>

      <style jsx>{`
        .summary-box__container:last-child {
          width: 100%;
        }

        /* Desktop */
        @media only screen and (min-width: 768px) {
          .summary-box__container:last-child {
            width: 33.333333%;
          }
        }
      `}</style>
    </MainLayout>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  summary: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Projects.getInitialProps = async () => {
  return {
    projects: [
      {
        id: '1',
        address: '131 Bobby River',
        name: 'Berenice Owen',
        budget: 72000,
        budgetUpdatedDate: 1,
        totalPaid: 45000,
        pendingPayment: 27000,
        budgetChanged: 72000,
        createdDate: '11/24/2019',
        daysLeft: 10,
        percentageProgress: 30,
        projectStatus: 'progress',
      },
      {
        id: '2',
        address: '142 Street, Miami',
        name: 'Steve Kin',
        budget: 90000,
        budgetUpdatedDate: 5,
        totalPaid: 90000,
        pendingPayment: 0,
        budgetChanged: 72000,
        createdDate: '11/24/2019',
        daysLeft: 0,
        percentageProgress: 100,
        projectStatus: 'completed',
      },
      {
        id: '3',
        address: '142 Street, Miami',
        name: 'Steve Kin',
        budget: 90000,
        budgetUpdatedDate: 5,
        totalPaid: 90000,
        pendingPayment: 0,
        budgetChanged: 72000,
        createdDate: '11/24/2019',
        daysLeft: 0,
        percentageProgress: 0,
        projectStatus: 'canceled',
      },
      {
        id: '4',
        address: '142 Street, Miami',
        name: 'Steve Kin',
        budget: 90000,
        budgetUpdatedDate: 5,
        totalPaid: 90000,
        pendingPayment: 0,
        budgetChanged: 72000,
        createdDate: '11/24/2019',
        daysLeft: 30,
        percentageProgress: 0,
        projectStatus: 'ready',
      },
    ],
    summary: [
      {
        icon: 'project-blue',
        number: 0,
        text: 'All Projects',
      },
      {
        icon: 'project-green',
        number: 0,
        text: 'Completed Projects',
      },
      {
        icon: 'project-dark',
        number: 0,
        text: 'Projects in progress',
      },
    ],
  };
};

export default Projects;
