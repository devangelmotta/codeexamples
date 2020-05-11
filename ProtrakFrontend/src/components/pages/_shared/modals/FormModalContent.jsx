import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Separator, Button } from '~/components/primitive';
import Loader from '../Loader';

const FormModalContent = ({ titleIcon, titleText, children }) => {
  return (
    <Fragment>
      <h2 className="flex flex-wrap items-center justify-start mb-8 text-2xl md:text-3xl text-gray-pt-300">
        <img
          className="h-8 w-8 mr-3"
          src={`/static/images/icons/${titleIcon}.svg`}
          alt={`${titleIcon} icon`}
        />
        {titleText}
      </h2>

      {children}
    </Fragment>
  );
};

FormModalContent.propTypes = {
  children: PropTypes.node.isRequired,
  titleIcon: PropTypes.string.isRequired,
  titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

// --- Components ---

FormModalContent.Footer = ({
  isLoading,
  isValid,
  mainActionText,
  onMainActionHandler,
  onCancelHandler,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-10">
      <Loader isLoading={isLoading} />
      <div className="w-full sm:w-1/4">
        <Button
          size="sm"
          className="w-full"
          disabled={!isValid}
          onClick={onMainActionHandler}
        >
          {mainActionText}
        </Button>
      </div>
      <Separator responsive={[1, 1, 'sm']} />
      <div className="w-full sm:w-1/4">
        <Button
          variant="pt-button--red"
          size="sm"
          className="w-full"
          disabled={!isValid}
          onClick={onCancelHandler}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

FormModalContent.Footer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  mainActionText: PropTypes.string.isRequired,
  onMainActionHandler: PropTypes.func.isRequired,
  onCancelHandler: PropTypes.func.isRequired,
};

export default FormModalContent;
