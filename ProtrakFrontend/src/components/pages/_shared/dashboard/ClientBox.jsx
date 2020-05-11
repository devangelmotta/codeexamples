import PropTypes from 'prop-types';

import { Button, Separator } from '~/components/primitive';
import { Routes } from '~/utils/constants';

import HeaderBox from './HeaderBox';

const ClientBox = ({ id, assignedProjects, name, totalProjects, pendingToApprove }) => {
  return (
    <div className="root rounded-md bg-gray-pt-400 p-3">
      <HeaderBox icon="user-blue" text={name} />
      <Separator color="gray" sizeTop={2} sizeBottom={3} />
      <div className="flex justify-between items-center text-gray-pt-200 my-1">
        <p className="text-xs font-thin">Assigned projects:</p>
        <p className="p-1 text-sm text-white text-center bg-blue-pt-100 rounded-lg w-8">
          {assignedProjects}
        </p>
      </div>
      <div className="flex justify-between items-center text-gray-pt-200 my-1">
        <p className="text-xs font-thin">Total projects:</p>
        <p className="p-1 text-sm text-white text-center bg-blue-pt-100 rounded-lg w-8">
          {totalProjects}
        </p>
      </div>
      <div className="flex justify-between items-center text-gray-pt-200 my-1">
        <p className="text-xs font-thin">Pending to approve:</p>
        <p className="p-1 text-sm text-white text-center bg-blue-pt-100 rounded-lg w-8">
          {pendingToApprove}
        </p>
      </div>
      <Separator size={3} />
      <div className="px-8">
        <Button
          className="w-full"
          size="sm"
          link={{
            href: Routes.CLIENT_DETAILS(id),
          }}
        >
          See details
        </Button>
      </div>

      <style jsx>
        {`
          .root {
            width: 100%;
            max-width: 100%;
          }

          /* No mobile */
          @media only screen and (min-width: 640px) {
            .root {
              width: 248px;
            }
          }
        `}
      </style>
    </div>
  );
};

ClientBox.propTypes = {
  id: PropTypes.string.isRequired,
  assignedProjects: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  totalProjects: PropTypes.number.isRequired,
  pendingToApprove: PropTypes.number.isRequired,
};

export default ClientBox;
