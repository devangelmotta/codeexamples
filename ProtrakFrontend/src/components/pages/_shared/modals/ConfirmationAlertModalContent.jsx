import PropTypes from 'prop-types';
import { Button, Separator } from '~/components/primitive';
import Loader from '../Loader';

const ConfirmationAlertModalContent = ({
  isLoading,
  mainActionText,
  onMainActionHandler,
  onCancelHandler,
}) => {
  return (
    <div className="root text-center">
      <Loader isLoading={isLoading} />
      <img
        src="/static/images/icons/alert-triangle.svg"
        className="w-24 h-24 mx-auto mb-6"
        alt="Alert-icon"
      />
      <h2 className="font-bold text-blue-pt-100 text-2xl mb-3">Are you sure?</h2>
      <p className="text-lg font-thin text-gray-pt-200 mb-8">
        You wont be able to revert this!
      </p>
      <div className="flex flex-column-reverse sm:flex-row flex-wrap">
        <Button
          size="sm"
          className="w-full sm:w-auto sm:flex-1"
          onClick={onCancelHandler}
        >
          No, cancel
        </Button>
        <Separator responsive={[1, 1, 'sm']} />
        <Button
          variant="pt-button--red"
          size="sm"
          className="w-full sm:w-auto sm:flex-1"
          onClick={onMainActionHandler}
        >
          {mainActionText}
        </Button>
      </div>

      <style jsx>
        {`
          /* No mobile */
          @media only screen and (min-width: 640px) {
            .root {
              min-width: 350px;
            }
          }
        `}
      </style>
    </div>
  );
};

ConfirmationAlertModalContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  mainActionText: PropTypes.string.isRequired,
  onMainActionHandler: PropTypes.func.isRequired,
  onCancelHandler: PropTypes.func.isRequired,
};

export default ConfirmationAlertModalContent;
