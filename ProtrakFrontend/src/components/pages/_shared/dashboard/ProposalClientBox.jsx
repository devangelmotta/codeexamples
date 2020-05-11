import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { Button, Label } from '~/components/primitive';
import { formatNumberToString, pluralize } from '~/utils/utils';
import { Routes } from '~/utils/constants';

import HeaderBox from './HeaderBox';

const ProposalClientBox = ({
  id,
  address,
  name,
  budget,
  expirationDays,
  creationDate,
  status,
}) => {
  const renderLabel = useCallback(status_ => {
    if (status_ === 'pending') {
      return <Label variant="pt-label--dark-yellow">PENDING</Label>;
    }

    if (status_ === 'approved') {
      return <Label variant="pt-label--dark-green">APPROVED</Label>;
    }

    if (status_ === 'declined') {
      return <Label variant="pt-label--red">DECLINED</Label>;
    }

    return null;
  }, []);

  return (
    <div className="w-full rounded bg-gray-pt-400 p-3">
      <HeaderBox
        icon="folder-client"
        text={address}
        subtext={name}
        label={renderLabel(status)}
      />
      <div className="rounded flex my-3 bg-green-pt-200 items-center py-1 px-2 justify-between">
        <div className="text-gray-pt-400">
          <p className="text-xs">Budget</p>
          <p className="font-bold text-xl">${formatNumberToString(budget)}</p>
        </div>
        <Button
          size="xs"
          variant="pt-button--light-gray"
          link={{
            href: Routes.PROPOSAL_CLIENTS_DETAILS(id),
          }}
        >
          See details
        </Button>
      </div>
      <ExpirationLabel expirationDays={expirationDays} creationDate={creationDate} />
    </div>
  );
};

ProposalClientBox.propTypes = {
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  expirationDays: PropTypes.number.isRequired,
  creationDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

// --- Components ---

const ExpirationLabel = ({ expirationDays, creationDate }) => {
  return (
    <div className="bg-yellow-pt-300 p-1 my-3">
      <div className="flex justify-between items-center">
        <div className="flex-1 border-blue-pt-100 border-r flex pr-2 items-center">
          <img src="/static/images/icons/calendar-blue.svg" alt="Calendar icon" />
          <p className="text-xs text-blue-pt-100 ml-2">
            Expires in {pluralize(expirationDays, 'day')}
          </p>
        </div>
        <p className="pl-2 text-xs text-blue-pt-100 text-right">
          Created: {creationDate}
        </p>
      </div>
    </div>
  );
};

ExpirationLabel.propTypes = {
  expirationDays: PropTypes.number.isRequired,
  creationDate: PropTypes.string.isRequired,
};

ProposalClientBox.ExpirationLabel = ExpirationLabel;

export default ProposalClientBox;
