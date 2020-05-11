import PropTypes from 'prop-types';

const HeaderBox = ({ icon, text, subtext, label }) => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <img
          src={`/static/images/icons/${icon}.svg`}
          className="w-8 h-8"
          alt="Project icon"
        />
        <div className="ml-2">
          <p className="font-bold text-sm">{text}</p>
          <p className="text-gray-pt-200 text-xs">{subtext}</p>
        </div>
      </div>
      {label && <div className="ml-3">{label}</div>}
    </div>
  );
};

HeaderBox.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,

  label: PropTypes.node,
  subtext: PropTypes.string,
};

HeaderBox.defaultProps = {
  label: null,
  subtext: '',
};

export default HeaderBox;
