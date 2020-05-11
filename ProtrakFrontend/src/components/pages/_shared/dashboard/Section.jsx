import PropTypes from 'prop-types';
import Link from 'next/link';
import { Separator } from '~/components/primitive';

const Section = ({ children, title, viewAllLink }) => {
  return (
    <div className="my-6">
      <div className="flex flex-no-wrap items-center justify-between mb-3">
        <p className="font-bold text-blue-pt-100 break-words">{title}</p>
        {viewAllLink !== '' && (
          <Link href={viewAllLink}>
            <div className="flex items-center cursor-pointer flex-shrink-0">
              <span className="font-bold text-blue-pt-100 mr-5">View All</span>
              <img
                src="/static/images/icons/arrow-forward-blue.svg"
                alt="Back icon"
                className="w-3 h-3"
              />
            </div>
          </Link>
        )}
      </div>
      <Separator color="gray" size={2} />
      {children}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  viewAllLink: PropTypes.string,
};

Section.defaultProps = {
  viewAllLink: '',
};

export default Section;
