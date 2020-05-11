import { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  MoneyBox,
  Project,
  ProposalClientBox,
  Section,
  SummaryBox,
  ProposalSupplierBox,
} from '~/components/pages/_shared';

const FullDashboard = ({ projects }) => {
  return (
    <Fragment>
      <SummarySection />
      <Section title="Projects">
        {/*
        <EmptySection
          icon="project-blue"
          text="You can create a new Project."
          button="Create new Project"
          onClick={() => {}}
        />
        */}
        <ProjectSection projects={projects} />
      </Section>
      <Section title="Proposals To Clients">
        {/*
        <EmptySection
          icon="proposals-blue"
          text="You can create a new Proposal."
          button="Create new Proposal"
          onClick={() => {}}
        />
        */}
        <ProposalsToClientSection />
      </Section>
      <Section title="Proposals To Suppliers">
        {/*
        <EmptySection
          icon="suppliers-blue"
          text="Send requests to suppliers.."
          button="Create new suppliers"
          onClick={() => {}}
        />
        */}
        <ProposalsToSupplierSection />
      </Section>
    </Fragment>
  );
};

FullDashboard.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: Fill this shape
};

// --- Components ---

const SummarySection = () => {
  const summary = [
    {
      icon: 'clients-blue',
      number: 126,
      text: 'Total Clients',
    },
    {
      icon: 'project-blue',
      number: 157,
      text: 'Total Projects',
    },
    {
      icon: 'proposals-blue',
      number: 24,
      text: 'Total Proposals',
    },
    {
      icon: 'suppliers-blue',
      number: 12,
      text: 'Total suppliers',
    },
    {
      icon: 'invoice-blue',
      number: 93,
      text: 'Total Invoices',
    },
  ];

  const earnings = [
    {
      icon: 'money-green',
      number: 302.028,
      text: 'Total earnings',
    },
    {
      icon: 'money-red',
      number: 109.032,
      text: 'Pending',
    },
    {
      icon: 'money-yellow',
      number: 62.012,
      text: 'Paid to suppliers',
    },
  ];

  return (
    <Fragment>
      <div className="flex flex-wrap mb-2">
        {summary.map(({ icon, number, text }, index) => {
          return (
            <div className="w-1/2 lg:w-1/5 p-1" key={`summary-box-${index}`}>
              <SummaryBox icon={icon} number={number} text={text} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap">
        {earnings.map(({ icon, number, text }, index) => {
          return (
            <div className="w-full sm:w-1/2 lg:w-1/3 p-1" key={`money-box-${index}`}>
              <MoneyBox icon={icon} number={number} text={text} />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

const ProjectSection = ({ projects }) => {
  return (
    <div className="flex flex-wrap mt-3">
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
  );
};

ProjectSection.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: Fill this shape
};

const ProposalsToClientSection = () => {
  const proposals = [
    {
      id: '1',
      address: '142 Street, Miami',
      name: 'Steve Kin',
      budget: 90000,
      expirationDays: 10,
      creationDate: '11/24/2019',
      status: 'pending',
    },
    {
      id: '2',
      address: '131 Bobby River',
      name: 'Berenice Owen',
      budget: 72000,
      expirationDays: 10,
      creationDate: '11/24/2019',
      status: 'approved',
    },
  ];

  return (
    <div className="flex flex-wrap mt-3">
      {proposals.map((item, index) => {
        return (
          <div className="w-full sm:w-1/2 lg:w-1/3 p-1" key={`project-box-${index}`}>
            <ProposalClientBox
              id={item.id}
              address={item.address}
              name={item.name}
              budget={item.budget}
              expirationDays={item.expirationDays}
              creationDate={item.creationDate}
              status={item.status}
            />
          </div>
        );
      })}
    </div>
  );
};

const ProposalsToSupplierSection = () => {
  const suppliers = [
    {
      id: '1',
      name: 'Painting service',
      company: 'Cements and tools Company',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: 28350,
      estimatedTime: 20,
      status: 'approved',
      expirationDays: 20,
      creationDate: '11/24/2019',
    },
    {
      id: '2',
      name: 'Painting service',
      company: 'Cements and tools Company',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: 28350,
      estimatedTime: 20,
      status: 'pending',
      expirationDays: 20,
      creationDate: '11/24/2019',
    },
  ];

  return (
    <div className="flex flex-wrap mt-3">
      {suppliers.map((item, index) => {
        return (
          <div className="w-full sm:w-1/2 lg:w-1/3 p-1" key={`project-box-${index}`}>
            <ProposalSupplierBox
              id={item.id}
              name={item.name}
              company={item.company}
              description={item.description}
              price={item.price}
              estimatedTime={item.estimatedTime}
              status={item.status}
              expirationDays={item.expirationDays}
              creationDate={item.creationDate}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FullDashboard;
