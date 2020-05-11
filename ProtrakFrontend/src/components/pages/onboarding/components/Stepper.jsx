import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button, Separator } from '~/components/primitive';

const Stepper = {};

Stepper.Title = ({ children, icon }) => {
  return (
    <h1 className="flex flex-wrap items-center text-2xl md:text-3xl text-gray-pt-300 mb-6">
      {icon ? (
        <Fragment>
          <img
            src={`/static/images/icons/${icon}.svg`}
            alt={`${icon} icon`}
            className="w-10 h-10 mr-3"
          />
          {children}
        </Fragment>
      ) : (
        children
      )}
    </h1>
  );
};

Stepper.Title.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Stepper.Title.defaultProps = {
  icon: '',
};

Stepper.MainText = ({ children }) => {
  return <h2 className="text-2xl md:text-3xl font-bold text-center mt-8">{children}</h2>;
};

Stepper.MainText.propTypes = {
  children: PropTypes.string.isRequired,
};

Stepper.SubText = ({ children }) => {
  return (
    <p className="text-xl md:text-2xl text-center text-gray-pt-200 mt-6">{children}</p>
  );
};

Stepper.SubText.propTypes = {
  children: PropTypes.string.isRequired,
};

Stepper.Footer = ({
  currentStep,
  showNextButton,
  disableNextButton,
  onNextButtonClick,

  totalSteps,
  showSkipButton,
  onSkipButtonClick,
}) => {
  return (
    <div className="flex flex-col-reverse md:flex-row md:items-end mt-12">
      <div className="mt-4 md:mt-0">
        <img
          src={`/static/images/components/stepper/${
            totalSteps === 2 ? 'two-' : ''
          }step-${currentStep}.svg`}
          className="mx-auto md:mx-0"
          alt="Step icon"
        />
      </div>

      <div className="flex w-full flex-col-reverse md:flex-row justify-center md:justify-end flex-1">
        {showSkipButton && (
          <Button
            size="sm"
            className="w-full md:w-1/4"
            variant="pt-button--gray"
            onClick={onSkipButtonClick}
          >
            Skip
          </Button>
        )}
        <Separator responsive={[1, 1]} />
        {showNextButton && (
          <Button
            size="sm"
            className="w-full md:w-1/4"
            disabled={disableNextButton}
            onClick={onNextButtonClick}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

Stepper.Footer.propTypes = {
  showNextButton: PropTypes.bool.isRequired,
  disableNextButton: PropTypes.bool.isRequired,
  currentStep: PropTypes.oneOf([1, 2, 3]).isRequired,
  onNextButtonClick: PropTypes.func.isRequired,

  totalSteps: PropTypes.oneOf([2, 3]),
  showSkipButton: PropTypes.bool,
  onSkipButtonClick: PropTypes.func,
};

Stepper.Footer.defaultProps = {
  totalSteps: 3,
  showSkipButton: false,
  onSkipButtonClick: undefined,
};

export default Stepper;
