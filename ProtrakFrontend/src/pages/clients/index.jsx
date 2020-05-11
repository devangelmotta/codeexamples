import PropTypes from 'prop-types';

import { MainLayout } from '~/components/layout';
import { Modal } from '~/components/primitive';
import {
  ClientModalContent,
  SummaryBox,
  Section,
  EmptySection,
  ClientBox,
} from '~/components/pages/_shared';

import { useSwitchOptions, useModal } from '~/hooks';

const Clients = ({ summary, clients }) => {
  const { isModalVisible, setIsModalVisible, onCloseModalHandler } = useModal();
  const {
    options: modalOptions,
    selectedOption: modalSelectedOption,
    setSelectedOption: modalSetSelectedOption,
  } = useSwitchOptions(['new-client']);

  return (
    <MainLayout pathname="clients">
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

      <Section title="Clients">
        {clients.length > 0 ? (
          <div className="flex flex-wrap">
            {clients.map((item, index) => {
              return (
                <div className="p-1" key={`client-box-${index}`}>
                  <ClientBox
                    id={item.id}
                    name={item.name}
                    assignedProjects={item.assignedProjects}
                    totalProjects={item.totalProjects}
                    pendingToApprove={item.pendingToApprove}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptySection
            icon="user-blue"
            text="Create a client to add to a budget."
            button="Create new clients"
            onClick={() => {
              modalSetSelectedOption(modalOptions.NEW_CLIENT);
              setIsModalVisible(true);
            }}
          />
        )}
      </Section>

      <Modal visible={isModalVisible} onCloseHandler={setIsModalVisible} showCloseButton>
        {modalSelectedOption === modalOptions.NEW_CLIENT && (
          <ClientModalContent variant="create" onCloseHandler={onCloseModalHandler} />
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

Clients.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.object).isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Clients.getInitialProps = async () => {
  return {
    summary: [
      {
        icon: 'user-blue',
        number: 0,
        text: 'Total clients',
      },
      {
        icon: 'user-green',
        number: 0,
        text: 'Clients in projects',
      },
      {
        icon: 'user-yellow',
        number: 0,
        text: 'Clients with pending proposals',
      },
    ],
    clients: [
      {
        id: '1',
        name: 'Berenice Owen',
        assignedProjects: 1,
        totalProjects: 1,
        pendingToApprove: 0,
      },
      {
        id: '2',
        name: 'Client 2',
        assignedProjects: 1,
        totalProjects: 1,
        pendingToApprove: 0,
      },
      {
        id: '3',
        name: 'Client 3',
        assignedProjects: 2,
        totalProjects: 10,
        pendingToApprove: 8,
      },
      {
        id: '4',
        name: 'Client 4',
        assignedProjects: 1,
        totalProjects: 1,
        pendingToApprove: 0,
      },
      {
        id: '5',
        name: 'Client 5',
        assignedProjects: 1,
        totalProjects: 1,
        pendingToApprove: 0,
      },
    ],
  };
};

export default Clients;
