import PropTypes from 'prop-types';

const MoneyBox = ({ icon, number, text }) => {
  return (
    <div className="rounded bg-gray-pt-400 p-4 text-center">
      <img
        className="mx-auto my-3 w-10 h-10"
        src={`/static/images/icons/${icon}.svg`}
        alt={icon}
      />
      <p className="font-bold text-3xl sm:text-5xl text-gray-pt-300">{number}</p>
      <p className="text-gray-pt-200">{text}</p>
    </div>
  );
};

MoneyBox.propTypes = {
  icon: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default MoneyBox;
