import { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Separator } from '~/components/primitive';
import { formatNumberToString, pluralize } from '~/utils/utils';
import { Routes } from '~/utils/constants';

import HeaderBox from './HeaderBox';

const Project = {};

const ProjectBox = ({
  id,
  address,
  name,
  budget,
  budgetUpdatedDate,
  totalPaid,
  pendingPayment,
  budgetChanged,
  createdDate,
  daysLeft,
  percentageProgress,
  projectStatus,
}) => {
  return (
    <div className="root rounded bg-gray-pt-400 p-3">
      <HeaderBox icon="project-blue" text={address} subtext={name} />
      <div className="flex flex-wrap mt-3">
        <AmountBox type="budget" value={budget} footer={budgetUpdatedDate} />
        <Separator size={1} orientation="v" />
        <AmountBox type="total-paid" value={totalPaid} footer={pendingPayment} />
      </div>
      <div
        className={classnames(
          'rounded flex my-3 items-center py-1 px-2 justify-between',
          `pt-project-status--${projectStatus}`,
        )}
      >
        <p className="text-xs text-gray-pt-400 pr-1">
          {projectStatus === 'completed' && 'Project completed'}
          {projectStatus === 'progress' && (
            <Fragment>
              <span>Budget change</span>
              <span className="ml-1 font-bold">
                ${formatNumberToString(budgetChanged)}
              </span>
            </Fragment>
          )}
          {projectStatus === 'canceled' && 'Project canceled'}
          {projectStatus === 'ready' && <span>Ready to start {createdDate}</span>}
        </p>

        <Button
          variant="pt-button--light-gray"
          size="xs"
          link={{
            href: Routes.PROJECT_DETAILS(id),
          }}
        >
          See details
        </Button>
      </div>

      <Separator color="gray" />

      <div className="flex justify-between text-gray-pt-200 my-2">
        <p className="text-xs font-thin">Created: {createdDate}</p>
        <p className="text-xs font-thin">{pluralize(daysLeft, 'day')} left</p>
      </div>
      <ProgressBar percentage={percentageProgress} />

      <style jsx>
        {`
          .root {
            width: 100%;
            max-width: 100%;
          }

          .pt-project-status--progress {
            background-color: var(--green-pt-200);
          }

          .pt-project-status--completed {
            background-color: var(--green-pt-100);
          }

          .pt-project-status--canceled {
            background-color: var(--red-pt-100);
          }

          .pt-project-status--ready {
            background-color: var(--gray-pt-200);
          }

          /* No mobile */
          @media only screen and (min-width: 640px) {
            .root {
              width: 300px;
            }
          }
        `}
      </style>
    </div>
  );
};

ProjectBox.propTypes = {
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  budgetUpdatedDate: PropTypes.number.isRequired,
  totalPaid: PropTypes.number.isRequired,
  pendingPayment: PropTypes.number.isRequired,
  budgetChanged: PropTypes.number.isRequired,
  createdDate: PropTypes.string.isRequired,
  daysLeft: PropTypes.number.isRequired,
  percentageProgress: PropTypes.number.isRequired,
  projectStatus: PropTypes.string.isRequired,
};

Project.Box = ProjectBox;

const AmountBox = ({ type, value, footer }) => {
  const isBudget = type === 'budget';

  return (
    <div className="flex-1 flex-shrink-0 border border-gray-pt-100 rounded p-1">
      <p className="text-xs">{isBudget ? 'Budget' : 'Total Paid'}</p>
      <p className="text-2xl font-bold leading-tight">${formatNumberToString(value)}</p>
      <p className="text-xs text-gray-pt-200">
        {isBudget
          ? `Last update: ${pluralize(footer, 'day')} ago`
          : `Pending: ${formatNumberToString(footer)}`}
      </p>
    </div>
  );
};

AmountBox.propTypes = {
  type: PropTypes.oneOf(['budget', 'total-paid']).isRequired,
  value: PropTypes.number.isRequired,
  footer: PropTypes.number.isRequired,
};

Project.AmountBox = AmountBox;

const DataItem = ({ title, data }) => {
  return (
    <div className="w-24 sm:w-1/3 p-1 my-2">
      <p className="font-bold text-gray-pt-300 mb-1">{title}</p>
      <p className="text-gray-pt-200 font-thin">{data}</p>
    </div>
  );
};

DataItem.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

Project.DataItem = DataItem;

const ProgressBar = ({ percentage }) => {
  return (
    <div className="root relative w-full bg-gray-pt-100">
      <div className="root__filler bg-gray-pt-200 h-full" />

      <style jsx>{`
        .root {
          border-radius: 5px;
          height: 5px;
          overflow: hidden;
        }
      `}</style>
      <style jsx>{`
        .root__filler {
          width: ${percentage}%;
        }
      `}</style>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Project;
