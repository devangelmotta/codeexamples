import PropTypes from 'prop-types';
import { MainLayout } from '~/components/layout';

import { Section, ProposalClientBox } from '~/components/pages/_shared';

const ProposalsToClients = ({ proposalsToClient }) => {
  return (
    <MainLayout pathname="proposals">
      <Section title="Proposals to Clients">
        <div className="flex flex-wrap">
          {proposalsToClient.map((item, index) => {
            return (
              <div className="w-full sm:w-1/2 lg:w-1/3 p-1" key={`proposal-box-${index}`}>
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
      </Section>
    </MainLayout>
  );
};

ProposalsToClients.propTypes = {
  proposalsToClient: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ProposalsToClients.getInitialProps = async () => {
  return {
    proposalsToClient: [
      {
        id: '1',
        address: '131 Bobby River',
        name: 'Berenice Owen',
        budget: 62500,
        expirationDays: 0,
        creationDate: '11/24/2019',
        status: 'approved',
      },
      {
        id: '2',
        address: '131 Bobby River',
        name: 'Berenice Owen',
        budget: 62500,
        expirationDays: 10,
        creationDate: '11/24/2019',
        status: 'pending',
      },
      {
        id: '3',
        address: '131 Bobby River',
        name: 'Berenice Owen',
        budget: 62500,
        expirationDays: 10,
        creationDate: '11/24/2019',
        status: 'declined',
      },
    ],
  };
};

export default ProposalsToClients;
