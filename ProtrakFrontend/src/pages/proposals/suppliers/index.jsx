import PropTypes from 'prop-types';
import { MainLayout } from '~/components/layout';

import { Section, ProposalSupplierBox } from '~/components/pages/_shared';

const ProposalsToSuppliers = ({ proposalsToSupplier }) => {
  return (
    <MainLayout pathname="proposals">
      <Section title="Proposals to Suppliers">
        <div className="flex flex-wrap">
          {proposalsToSupplier.map((item, index) => {
            return (
              <div className="w-full sm:w-1/2 lg:w-1/3 p-1" key={`supplier-box-${index}`}>
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
      </Section>
    </MainLayout>
  );
};

ProposalsToSuppliers.propTypes = {
  proposalsToSupplier: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ProposalsToSuppliers.getInitialProps = async () => {
  return {
    proposalsToSupplier: [
      {
        id: '1',
        name: 'Painting Service',
        company: 'Cements and tools Company',
        description:
          'Lorem ipsum dolor sit amet, consectetur' +
          'adipiscing elit, sed do eiusmod tempor incididunt ' +
          'ut labore et dolore magna aliqua. Ut enim ad minim' +
          'veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat.',
        price: 28350,
        estimatedTime: 20,
        status: 'approved',
        expirationDays: 20,
        creationDate: '11/24/2019',
      },
      {
        id: '2',
        name: 'Painting Service',
        company: 'Cements and tools Company',
        description:
          'Lorem ipsum dolor sit amet, consectetur' +
          'adipiscing elit, sed do eiusmod tempor incididunt ' +
          'ut labore et dolore magna aliqua. Ut enim ad minim' +
          'veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat.',
        price: 28350,
        estimatedTime: 20,
        status: 'requested',
        expirationDays: 20,
        creationDate: '11/24/2019',
      },
      {
        id: '3',
        name: 'Painting Service',
        company: 'Cements and tools Company',
        description:
          'Lorem ipsum dolor sit amet, consectetur' +
          'adipiscing elit, sed do eiusmod tempor incididunt ' +
          'ut labore et dolore magna aliqua. Ut enim ad minim' +
          'veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat.',
        price: 28350,
        estimatedTime: 20,
        status: 'pending',
        expirationDays: 20,
        creationDate: '11/24/2019',
      },
    ],
  };
};

export default ProposalsToSuppliers;
