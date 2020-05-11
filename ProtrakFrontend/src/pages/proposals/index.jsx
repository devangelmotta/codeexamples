import PropTypes from 'prop-types';
import { Routes } from '~/utils/constants';

import { MainLayout } from '~/components/layout';
import { Modal } from '~/components/primitive';
import {
  ProposalToSupplierModalContent,
  ProposalToClientModalContent,
  SummaryBox,
  Section,
  EmptySection,
  ProposalClientBox,
  ProposalSupplierBox,
} from '~/components/pages/_shared';

import { useSwitchOptions, useModal } from '~/hooks';

const Proposals = ({ summary, proposalsToSupplier, proposalsToClient }) => {
  const { isModalVisible, setIsModalVisible, onCloseModalHandler } = useModal();
  const {
    options: modalOptions,
    selectedOption: modalSelectedOption,
    setSelectedOption: modalSetSelectedOption,
  } = useSwitchOptions(['client', 'supplier']);

  return (
    <MainLayout pathname="proposals">
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
      <Section
        title="Proposals to Clients"
        viewAllLink={proposalsToClient.length > 0 ? Routes.PROPOSALS_CLIENTS : ''}
      >
        {proposalsToClient.length > 0 ? (
          <div className="flex flex-wrap">
            {proposalsToClient.map((item, index) => {
              return (
                <div
                  className="w-full sm:w-1/2 lg:w-1/3 p-1"
                  key={`proposal-box-${index}`}
                >
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
        ) : (
          <EmptySection
            icon="folder-client"
            text="You can create a proposal for a client."
            button="Create new Proposal"
            onClick={() => {
              modalSetSelectedOption(modalOptions.CLIENT);
              setIsModalVisible(true);
            }}
          />
        )}
      </Section>
      <Section
        title="Proposals to Suppliers"
        viewAllLink={proposalsToSupplier.length > 0 ? Routes.PROPOSALS_SUPPLIERS : ''}
      >
        {proposalsToSupplier.length > 0 ? (
          <div className="flex flex-wrap">
            {proposalsToSupplier.map((item, index) => {
              return (
                <div
                  className="w-full sm:w-1/2 lg:w-1/3 p-1"
                  key={`supplier-box-${index}`}
                >
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
        ) : (
          <EmptySection
            icon="folder-suppliers"
            text="You can create a proposal for a supplier."
            button="Create new proposal"
            onClick={() => {
              modalSetSelectedOption(modalOptions.SUPPLIER);
              setIsModalVisible(true);
            }}
          />
        )}
      </Section>

      <Modal visible={isModalVisible} onCloseHandler={setIsModalVisible} showCloseButton>
        {modalSelectedOption === modalOptions.CLIENT && (
          <ProposalToClientModalContent onCloseHandler={onCloseModalHandler} />
        )}
        {modalSelectedOption === modalOptions.SUPPLIER && (
          <ProposalToSupplierModalContent onCloseHandler={onCloseModalHandler} />
        )}
      </Modal>

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

Proposals.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.object).isRequired,
  proposalsToSupplier: PropTypes.arrayOf(PropTypes.object).isRequired,
  proposalsToClient: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Proposals.getInitialProps = async () => {
  return {
    summary: [
      {
        icon: 'proposals-blue',
        number: 5,
        text: 'All Proposals',
      },
      {
        icon: 'proposals-green',
        number: 3,
        text: 'Completed Proposals',
      },
      {
        icon: 'proposals-yellow',
        number: 2,
        text: 'Proposals in progress',
      },
    ],
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

export default Proposals;
