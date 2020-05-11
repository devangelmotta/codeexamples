import PropTypes from 'prop-types';
import { useCallback } from 'react';
import classnames from 'classnames';

import { Button, Separator, Modal, Label } from '~/components/primitive';
import { MainLayout } from '~/components/layout';
import { ConfirmationAlertModalContent, DetailsHeader } from '~/components/pages/_shared';

import { formatNumberToString, pluralize } from '~/utils/utils';
import { Routes } from '~/utils/constants';
import { useSwitchOptions, useModal } from '~/hooks';

const ProposalDetails = ({ proposal }) => {
  const { isModalVisible, setIsModalVisible, onCloseModalHandler } = useModal();
  const {
    options: modalOptions,
    selectedOption: modalSelectedOption,
    setSelectedOption: setModalSelectedOption,
  } = useSwitchOptions(['request-changes', 'cancel']);

  const renderLabel = useCallback(status_ => {
    if (status_ === 'pending') {
      return (
        <Label className="w-full sm:w-auto" variant="pt-label--dark-yellow">
          PENDING
        </Label>
      );
    }

    if (status_ === 'declined') {
      return (
        <Label className="w-full sm:w-auto" variant="pt-label--red">
          DECLINED
        </Label>
      );
    }

    if (status_ === 'earring') {
      return (
        <Label className="w-full sm:w-auto" variant="pt-label--gray">
          Earring By Supplier
        </Label>
      );
    }

    if (status_ === 'approved') {
      return (
        <Label className="w-full sm:w-auto" variant="pt-label--dark-green">
          APPROVED
        </Label>
      );
    }

    return null;
  }, []);

  return (
    <MainLayout pathname="proposals">
      <DetailsHeader
        icon="folder-suppliers"
        title={proposal.name}
        subtitle={`Supplier: ${proposal.company}`}
        createdDate={proposal.creationDate}
        backLink={Routes.PROPOSALS}
      />

      <div className="flex flex-wrap md:flex-no-wrap justify-between items-start">
        <div className="w-full md:w-5/12 rounded border border-gray-pt-100 bg-gray-pt-400 mr-2 py-4">
          <div className="flex items-center py-4 px-8">
            <img
              src="/static/images/icons/suppliers-blue.svg"
              alt="Supplier Icon"
              className="w-6 h-6"
            />
            <span className="text-blue-pt-100 text-sm ml-5">{proposal.name}</span>
          </div>
          <Separator color="gray" size={3} />
          <div className="flex flex-col justify-center items-start px-8">
            <div className="text-xs text-blue-pt-100">Estimated Time</div>
            <p className="text-gray-pt-200 text-xl">
              {pluralize(proposal.estimatedTime, 'day')}
            </p>
          </div>
          <Separator color="gray" size={3} />
          <div className="flex flex-col justify-center items-start px-8">
            <div className="text-blue-pt-100 mb-2">Notes</div>
            <p className="text-gray-pt-200 text-sm">{proposal.description}</p>
          </div>
          <Separator color="gray" size={3} />
          <div className="flex w-full flex-wrap my-2 px-8">
            <div className="w-full flex justify-between">
              <div className="text-gray-pt-200 text-sm">Contact:</div>
              <div className="text-right text-blue-pt-100 text-sm">
                {proposal.contact}
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="text-gray-pt-200 text-sm">Company:</div>
              <div className="text-right text-blue-pt-100 text-sm">
                {proposal.company}
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="text-gray-pt-200 text-sm">Address:</div>
              <div className="text-right text-blue-pt-100 text-sm">
                {proposal.address}
              </div>
            </div>
          </div>
          <Separator color="gray" size={3} />
          {proposal.status === 'approved' && (
            <div className="w-full flex items-center px-8">
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
          )}
        </div>

        <div className="flex flex-col justify-center items-start mr-2 mt-4 md:mt-0 rounded bg-gray-pt-400 border border-gray-pt-100">
          <div className="w-full md:flex justify-around hidden py-4 px-8">
            <div className="flex-1 text-blue-pt-100 text-sm">DESCRIPTION</div>
            <div className="flex-1 text-blue-pt-100 text-sm">QUANTITY</div>
            <div className="flex-1 text-blue-pt-100 text-sm">UNIT PRICE</div>
            <div className="flex-1 text-blue-pt-100 text-sm text-right">AMOUNT</div>
          </div>
          <div
            className={classnames(
              'w-full border-0 md:border-t md:border-b md:border-gray-pt-100',
              proposal.status === 'earring' && 'h-48',
            )}
          >
            {proposal.status !== 'earring' &&
              proposal.items.map((item, index) => {
                return (
                  <div
                    key={`item-${index}`}
                    className="w-full justify-around items-center flex py-4 px-8 border-gray-pt-100 border-b md:border-b-0"
                  >
                    <div className="flex flex-col md:flex-row w-1/2 md:w-3/4">
                      <div className="md:w-1/3 text-gray-pt-200 text-sm md:font-normal font-bold">
                        {item.description}
                      </div>
                      <div className="md:w-1/3 flex flex-1 flex-no-wrap md:flex-wrap">
                        <div className="md:flex-1 text-gray-pt-200 text-sm">{`${
                          item.quantity
                        } X`}</div>
                        <div className="md:flex-1 text-gray-pt-200 text-sm ml-2 md:ml-auto">
                          {`$ ${formatNumberToString(item.unitPrice)}`}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 md:w-1/4 text-right text-gray-pt-200 text-sm md:font-normal font-bold">
                      {`$ ${formatNumberToString(item.unitPrice * item.quantity)}`}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex justify-between flex-wrap-reverse px-8 py-6">
            <div className="flex w-full md:w-6/12 md:flex-1 flex-shrink-0 flex-wrap mt-5 md:mt-0">
              <div className="w-full items-center flex justify-start mb-3">
                <span className="text-gray-pt-200 text-sm mr-3 hidden sm:inline-block">
                  Status:
                </span>
                {renderLabel(proposal.status)}
              </div>
              {proposal.status === 'pending' && (
                <div className="w-full flex flex-wrap">
                  <Button
                    size="xs"
                    variant="pt-button--green"
                    className="flex-1"
                    onClick={e => {
                      alert(e.currentTarget.innerText);
                    }}
                  >
                    Accept
                  </Button>
                  <Separator orientation="v" size={1} />
                  <Button
                    size="xs"
                    variant="pt-button--red"
                    className="flex-1"
                    onClick={() => {
                      setModalSelectedOption(modalOptions.CANCEL);
                      setIsModalVisible(true);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    className="w-full mt-2"
                    onClick={() => {
                      setModalSelectedOption(modalOptions.REQUEST_CHANGES);
                      setIsModalVisible(true);
                    }}
                  >
                    Request Changes
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center w-full md:w-6/12 flex-wrap pl-0 md:pl-4">
              <div className="w-full flex justify-between mb-2">
                <div className="text-gray-pt-200 text-sm text-left md:text-right w-1/2">
                  Subtotal:
                </div>
                <div className="text-gray-pt-200 text-sm w-1/2 text-right">{`$ ${formatNumberToString(
                  proposal.subtotal,
                )}`}</div>
              </div>
              <div className="w-full flex justify-between mb-2">
                <div className="text-gray-pt-200 text-sm text-left md:text-right w-1/2">
                  TAX(20%):
                </div>
                <div className="text-gray-pt-200 text-sm w-1/2 text-right">{`$ ${formatNumberToString(
                  proposal.tax,
                )}`}</div>
              </div>
              <div className="w-full flex justify-between">
                <div className="text-gray-pt-200 text-sm text-left md:text-right w-1/2">
                  Total Amount:
                </div>
                <div className="text-green-pt-100 text-sm w-1/2 text-right">{`$ ${formatNumberToString(
                  proposal.total,
                )}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal visible={isModalVisible} onCloseHandler={setIsModalVisible} showCloseButton>
        {modalSelectedOption === modalOptions.REQUEST_CHANGES && (
          <div>Request Changes modal content</div>
        )}
        {modalSelectedOption === modalOptions.CANCEL && (
          <ConfirmationAlertModalContent
            isLoading={false}
            mainActionText="Yes do it!."
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
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    estimatedTime: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    expirationDays: PropTypes.number.isRequired,
    creationDate: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    subtotal: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

ProposalDetails.getInitialProps = async ({ query }) => {
  return {
    proposal: {
      id: query.id,
      name: 'Painting Service',
      company: 'Cements and tools Company',
      address: '131 Bobby River',
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
      contact: 'Alfred Clarke',
      items: [
        { description: 'Item 1 - Project', quantity: 1, unitPrice: 3000 },
        { description: 'Item 2 - Project', quantity: 3, unitPrice: 4600 },
        { description: 'Item 3 - Project', quantity: 1, unitPrice: 7900 },
      ],
      subtotal: 24700,
      tax: 4940,
      total: 29640,
    },
  };
};

export default ProposalDetails;
