import PropTypes from 'prop-types';

const SummaryBox = ({ icon, number, text }) => {
  return (
    <div className="rounded-md overflow-hidden">
      <div className="flex items-center bg-gray-pt-400 px-3 py-2">
        <img
          src={`/static/images/icons/${icon}.svg`}
          className="mr-3 w-6 sm:w-10 h-6 sm:h-10"
          alt={`${icon} icon`}
        />
        <p className="text-2xl sm:text-4xl text-gray-pt-300">{number}</p>
      </div>
      <div className="bg-gray-pt-100 py-1 px-2">
        <p className="text-right text-xs font-thin">{text}</p>
      </div>
    </div>
  );
};

SummaryBox.propTypes = {
  icon: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default SummaryBox;
