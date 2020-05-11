import PropTypes from 'prop-types';

import { Button } from '~/components/primitive';

const EmptySection = ({ button, icon, onClick, text }) => {
  return (
    <div className="py-5 px-2">
      <img
        className="mx-auto my-3"
        src={`/static/images/icons/${icon}.svg`}
        alt={icon}
        width="36"
      />
      <p className="text-gray-pt-200 text-center mb-3">{text}</p>
      <div className="text-center">
        <Button onClick={onClick} size="sm">
          {button}
        </Button>
      </div>
    </div>
  );
};

EmptySection.propTypes = {
  button: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default EmptySection;
