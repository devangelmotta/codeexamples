import PropTypes from 'prop-types';
import { Fragment, useCallback } from 'react';

import { Button, Separator, Modal } from '~/components/primitive';
import { MainLayout } from '~/components/layout';
import {
  ConfirmationAlertModalContent,
  DetailsHeader,
  EditProposalModalContent,
  Project,
} from '~/components/pages/_shared';

import { formatNumberToString, pluralize } from '~/utils/utils';
import { Routes } from '~/utils/constants';
import { useSwitchOptions, useModal } from '~/hooks';

const ProposalDetails = ({ proposal }) => {
  const { isModalVisible, setIsModalVisible, onCloseModalHandler } = useModal();
  const {
    options: modalOptions,
    selectedOption: modalSelectedOption,
    setSelectedOption: setModalSelectedOption,
  } = useSwitchOptions(['edit', 'delete']);

  return (
    <MainLayout pathname="proposals">
      <DetailsHeader
        icon="folder-client"
        title={proposal.address}
        subtitle={`Client: ${proposal.clientName}`}
        createdDate={proposal.createdDate}
        backLink={Routes.PROPOSALS}
      />

      <div className="flex flex-wrap w-full justify-between">
        <div className="w-full md:w-auto md:flex-1">
          <div className="p-4 rounded-md bg-gray-pt-400">
            <div className="flex flex-wrap w-full justify-between my-3">
              <Project.DataItem title="Budget Name" data={proposal.address} />
              <Project.DataItem
                title="Estimated Cost"
                data={`$ ${formatNumberToString(proposal.estimatedCost)}`}
              />
              <Project.DataItem title="Client" data={proposal.clientName} />
            </div>
            <div className="flex flex-wrap w-full justify-between sm:justify-start my-3">
              <Project.DataItem title="Start Date" data={proposal.startDate} />
              <Project.DataItem title="End Date" data={proposal.endDate} />
            </div>
            <p className="font-bold text-xl my-4 text-gray-pt-300">
              Additional information
            </p>
            <p className="text-gray-pt-200 text-sm mb-4 text-justify">
              {proposal.additionalInfo}
            </p>

            <Separator size={3} color="gray" />
            {proposal.currentStatus === 'approved' ? (
              <div className="flex">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    alert('Go to project');
                  }}
                >
                  Go To Project
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap justify-between sm:justify-end">
                <Button
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setModalSelectedOption(modalOptions.EDIT);
                    setIsModalVisible(true);
                  }}
                >
                  Edit
                </Button>
                <Separator responsive={[1, 1, 'sm']} />
                <Button
                  variant="pt-button--red"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setModalSelectedOption(modalOptions.DELETE);
                    setIsModalVisible(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <Separator responsive={[2, 2]} />
        <div className="w-full md:w-auto md:flex-1">
          <p className="text-blue-pt-100 font-bold">Status</p>
          {proposal.statusLog.map((item, index) => {
            return (
              <StatusBox
                key={`status-box-reduced-${index}`}
                status={item.status}
                daysAgo={item.daysAgo}
              />
            );
          })}
        </div>
      </div>

      <Modal visible={isModalVisible} onCloseHandler={setIsModalVisible} showCloseButton>
        {modalSelectedOption === modalOptions.EDIT && (
          <EditProposalModalContent
            proposal={proposal}
            onCloseHandler={onCloseModalHandler}
          />
        )}
        {modalSelectedOption === modalOptions.DELETE && (
          <ConfirmationAlertModalContent
            isLoading={false}
            mainActionText="Yes, delete it."
            onMainActionHandler={e => {
              alert(e.currentTarget.innerText);
            }}
            onCancelHandler={onCloseModalHandler}
          />
        )}
      </Modal>
    </MainLayout>
  );
};

ProposalDetails.propTypes = {
  proposal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    estimatedCost: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string.isRequired,
    currentStatus: PropTypes.string.isRequired,
    statusLog: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

ProposalDetails.getInitialProps = async ({ query }) => {
  return {
    proposal: {
      id: query.id,
      clientName: 'Berenice Owen',
      estimatedCost: 62000,
      address: '131 Bobby River',
      startDate: '11/24/2019',
      endDate: '12/19/2019',
      createdDate: '02/17/2019',
      additionalInfo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing' +
        'elit, sed do eiusmod tempor incididunt ut labore et' +
        'dolore magna aliqua. Ut enim ad minim veniam, quis ' +
        'nostrud exercitation ullamco laboris nisi ut aliquip ' +
        'ex ea commodo consequat. Duis aute irure dolor in ' +
        'reprehenderit in voluptate velit esse cillum dolore ' +
        'eu fugiat nulla pariatur. Excepteur sint occaecat ' +
        'cupidatat non proident, sunt in culpa qui officia ' +
        'deserunt mollit anim id est laborum.',
      currentStatus: 'pending',
      statusLog: [
        {
          status: 'pending',
          daysAgo: 2,
        },
        {
          status: 'approved',
          daysAgo: 1,
        },
      ],
    },
  };
};

// --- Components ---

const StatusBox = ({ status, daysAgo }) => {
  const renderContent = useCallback(status_ => {
    if (status_ === 'pending') {
      return (
        <Fragment>
          <img
            src="/static/images/icons/alert-triangle-proposal.svg"
            alt="Pending Appoval Icon"
            className="w-8 h-8 mr-4"
          />
          <p className="flex-1 font-bold text-gray-pt-300">Pending approval.</p>
        </Fragment>
      );
    }

    if (status_ === 'approved') {
      return (
        <Fragment>
          <img
            src="/static/images/icons/check-white.svg"
            alt="Proposal Approved Icon"
            className="w-8 h-8 mr-4"
          />
          <p className="flex-1 font-bold text-gray-pt-300">Proposal approved.</p>
        </Fragment>
      );
    }
    return null;
  }, []);

  return (
    <div className="my-4 rounded bg-gray-pt-400 p-2">
      <div className="flex flex-row items-center px-2">
        {renderContent(status)}
        <p className="text-sm text-gray-pt-200 font-thin">
          {pluralize(daysAgo, 'day')} ago
        </p>
      </div>
    </div>
  );
};

StatusBox.propTypes = {
  status: PropTypes.string.isRequired,
  daysAgo: PropTypes.number.isRequired,
};

export default ProposalDetails;
