import PropTypes from 'prop-types';
import { useCallback, Fragment } from 'react';

import { Button, Label } from '~/components/primitive';
import { formatNumberToString, pluralize } from '~/utils/utils';
import { Routes } from '~/utils/constants';

import ProposalClientBox from './ProposalClientBox';
import HeaderBox from './HeaderBox';

const ProposalSupplierBox = ({
  id,
  name,
  company,
  description,
  price,
  estimatedTime,
  status,
  expirationDays,
  creationDate,
}) => {
  const renderLabel = useCallback(status_ => {
    if (status_ === 'pending') {
      return <Label variant="pt-label--dark-yellow">PENDING</Label>;
    }

    if (status_ === 'approved') {
      return <Label variant="pt-label--dark-green">APPROVED</Label>;
    }

    return null;
  }, []);

  const renderBoxContent = useCallback(status_ => {
    if (status_ === 'approved') {
      return (
        <Fragment>
          <div className="flex my-2 text-blue-pt-100">
            <div className="rounded flex-1 mr-1 bg-gray-pt-100 py-1 px-2">
              <p className="text-xs font-normal">Price</p>
              <p className="text-xl">${formatNumberToString(price)}</p>
            </div>
            <div className="rounded flex-1 ml-1 bg-gray-pt-100 py-1 px-2">
              <p className="text-xs">Estimated time</p>
              <p className="text-xl">{pluralize(estimatedTime, 'day')}</p>
            </div>
          </div>
          <Button
            className="w-full"
            size="sm"
            link={{
              href: Routes.PROPOSAL_SUPPLIERS_DETAILS(id),
            }}
          >
            See details
          </Button>
        </Fragment>
      );
    }

    if (status_ === 'requested') {
      return (
        <Fragment>
          <div className="flex my-2 text-blue-pt-100">
            <div className="rounded flex-1 mr-1 bg-gray-pt-100 py-1 px-2">
              <p className="text-xs font-normal">Price</p>
              <p className="text-xl">${formatNumberToString(price)}</p>
            </div>
            <div className="rounded flex-1 ml-1 bg-gray-pt-100 py-1 px-2">
              <p className="text-xs">Estimated time</p>
              <p className="text-xl">{pluralize(estimatedTime, 'day')}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 mr-1">
              <Button
                className="pt-button--green w-full"
                size="sm"
                onClick={e => {
                  alert(e.currentTarget.innerText);
                }}
              >
                Accept
              </Button>
            </div>
            <div className="flex-1 ml-1">
              <Button
                className="pt-button--red w-full"
                size="sm"
                onClick={e => {
                  alert(e.currentTarget.innerText);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Fragment>
      );
    }

    if (status_ === 'pending') {
      return (
        <Fragment>
          <ProposalClientBox.ExpirationLabel
            expirationDays={expirationDays}
            creationDate={creationDate}
          />
          <Button
            className="w-full"
            size="sm"
            link={{
              href: Routes.PROPOSAL_SUPPLIERS_DETAILS(id),
            }}
          >
            See details
          </Button>
        </Fragment>
      );
    }

    return null;
  }, []);

  return (
    <div className="w-full rounded bg-gray-pt-400 p-3">
      <HeaderBox
        icon="folder-suppliers"
        text={name}
        subtext={company}
        label={renderLabel(status)}
      />
      <p className="mt-3 text-gray-pt-200 text-xs leading-tight">{description}</p>
      {renderBoxContent(status)}
    </div>
  );
};

ProposalSupplierBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  estimatedTime: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  expirationDays: PropTypes.number.isRequired,
  creationDate: PropTypes.string.isRequired,
};

export default ProposalSupplierBox;
