import PropTypes from 'prop-types';

import { MainLayout } from '~/components/layout';
import { FullDashboard, EmptyDashboard } from '~/components/pages/dashboard';

const Dashboard = ({ projects }) => {
  return (
    <MainLayout pathname="dashboard">
      {projects.length === 0 ? <EmptyDashboard /> : <FullDashboard projects={projects} />}
    </MainLayout>
  );
};

Dashboard.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: Fill this shape
};

Dashboard.getInitialProps = () => {
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
    ],
  };
};

export default Dashboard;
