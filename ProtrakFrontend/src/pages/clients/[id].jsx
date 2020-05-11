import PropTypes from 'prop-types';

import { Button, Separator, Modal } from '~/components/primitive';
import { MainLayout } from '~/components/layout';
import {
  ClientModalContent,
  ConfirmationAlertModalContent,
  DetailsHeader,
  HeaderBox,
  Project,
} from '~/components/pages/_shared';

import { Routes } from '~/utils/constants';
import { useSwitchOptions, useModal } from '~/hooks';

const ClientDetails = ({ client }) => {
  const { isModalVisible, setIsModalVisible, onCloseModalHandler } = useModal();
  const {
    options: modalOptions,
    selectedOption: modalSelectedOption,
    setSelectedOption: setModalSelectedOption,
  } = useSwitchOptions(['edit', 'delete']);

  return (
    <MainLayout pathname="clients">
      <DetailsHeader
        icon="user-blue"
        title={client.name}
        subtitle={`Assigned projects: ${client.assignedProjects}`}
        createdDate={client.createdDate}
        backLink={Routes.CLIENTS}
      />
      <div className="flex flex-wrap w-full justify-between">
        <div className="w-full md:w-auto md:flex-1">
          <div className="p-4 rounded-md bg-gray-pt-400">
            <div className="text-lg font-bold text-black">Email</div>
            <div className="text-gray-pt-200 font-thin mt-1 mb-5">{client.email}</div>
            <div className="text-lg font-bold text-black">Phone</div>
            <div className="text-gray-pt-200 font-thin mt-1 mb-5">{client.phone}</div>
            <div className="text-lg font-bold text-black">Address</div>
            <div className="text-gray-pt-200 font-thin mt-1 mb-5">{client.address}</div>
            <div className="text-lg font-bold text-black">Additional Information</div>
            <div className="text-gray-pt-200 font-thin mt-1 mb-5">
              {client.additionalInfo}
            </div>
            <Separator size={3} color="gray" />
            <div className="flex flex-wrap justify-between sm:justify-end">
              <Button
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => {
                  setModalSelectedOption(modalOptions.EDIT);
                  setIsModalVisible(true);
                }}
              >
                Edit client
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
                Delete client
              </Button>
            </div>
          </div>
        </div>
        <Separator responsive={[2, 2]} />
        <div className="w-full md:w-auto md:flex-1">
          <p className="text-blue-pt-100 font-bold">Projects</p>
          {client.projects.map((item, index) => {
            return (
              <ProjectBoxReduced
                key={`project-box-reduced-${index}`}
                address={item.address}
                name={item.name}
                budget={item.budget}
                budgetUpdatedDate={item.budgetUpdatedDate}
                totalPaid={item.totalPaid}
                pendingPayment={item.pendingPayment}
              />
            );
          })}
        </div>
      </div>

      <Modal visible={isModalVisible} onCloseHandler={setIsModalVisible} showCloseButton>
        {modalSelectedOption === modalOptions.EDIT && (
          <ClientModalContent
            variant="edit"
            client={client}
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

ClientDetails.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    assignedProjects: PropTypes.number.isRequired,
    createdDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string.isRequired,
    projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

ClientDetails.getInitialProps = async ({ query }) => {
  return {
    client: {
      id: query.id,
      name: 'Berenice Owen',
      assignedProjects: 1,
      createdDate: '02/17/2019',
      email: 'west.isai@gmail.com',
      phone: '+1 332 4435 4356',
      address: '450 Lurline Stream',
      additionalInfo:
        ' Along with conventional advertising and ' +
        'below the line activities, organizations and corporate bodies' +
        'have come to realize that they need to invest in trade shows' +
        'in order to create maximum recall for their product or brand' +
        'name. There are several benefits to participating in a trade show.',
      projects: [
        {
          address: '131 Bobby River',
          name: 'Berenice Owen',
          budget: 62500,
          budgetUpdatedDate: 1,
          totalPaid: 45000,
          pendingPayment: 17500,
        },
        {
          address: '131 Bobby River',
          name: 'Berenice Owen',
          budget: 62500,
          budgetUpdatedDate: 2,
          totalPaid: 45000,
          pendingPayment: 17500,
        },
      ],
    },
  };
};

// --- Components ---

const ProjectBoxReduced = ({
  address,
  name,
  budget,
  budgetUpdatedDate,
  totalPaid,
  pendingPayment,
}) => {
  return (
    <div className="my-4 rounded bg-gray-pt-400 p-2">
      <div className="flex flex-row flex-wrap sm:flex-no-wrap items-stretch">
        <div className="w-full sm:w-1/3 flex items-center flex-shrink-0 pr-2">
          <HeaderBox icon="project-white-outlined" text={address} subtext={name} />
        </div>
        <div className="w-full sm:w-2/3 flex flex-row flex-no-wrap flex-shrink-0 mt-4 sm:mt-0">
          <Project.AmountBox type="budget" value={budget} footer={budgetUpdatedDate} />
          <Separator size={1} orientation="v" />
          <Project.AmountBox
            type="total-paid"
            value={totalPaid}
            footer={pendingPayment}
          />
        </div>
      </div>
    </div>
  );
};

ProjectBoxReduced.propTypes = {
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  budgetUpdatedDate: PropTypes.number.isRequired,
  totalPaid: PropTypes.number.isRequired,
  pendingPayment: PropTypes.number.isRequired,
};

export default ClientDetails;
