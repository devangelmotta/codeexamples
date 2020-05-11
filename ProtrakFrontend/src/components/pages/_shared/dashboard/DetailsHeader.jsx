import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Separator } from '~/components/primitive';

const DetailsHeader = ({ icon, title, subtitle, createdDate, backLink }) => {
  return (
    <Fragment>
      <div className="flex items-center mb-4">
        <img
          src={`/static/images/icons/${icon}.svg`}
          alt="Header Icon"
          className="w-24 h-24"
        />
        <div className="ml-6">
          <h1 className="font-bold text-2xl mb-1 text-gray-pt-300">{title}</h1>
          <p className="text-gray-pt-200 font-thin">{subtitle}</p>
          <p className="text-gray-pt-200 font-thin">Created: {createdDate}</p>
        </div>
      </div>
      <Separator size={3} color="gray" />
      <Link href={backLink}>
        <div className="flex items-center cursor-pointer mt-3">
          <img
            src="/static/images/icons/arrow-left-blue.svg"
            alt="Back icon"
            className="w-4 h-4"
          />
          <span className="font-thin text-lg text-blue-pt-100 ml-3">Back</span>
        </div>
      </Link>
      <Separator size={3} />
    </Fragment>
  );
};

DetailsHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  backLink: PropTypes.string.isRequired,
};

export default DetailsHeader;
