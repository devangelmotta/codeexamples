import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from '~/components/primitive';

const GoogleButton = ({ className, isSignIn, disabled, isLoading, onClick }) => {
  return (
    <div className={classnames('root inline-flex', className)}>
      <Button
        className="pt-google-button"
        type="button"
        x-align="justify-between"
        disabled={isLoading || disabled}
        isLoading={isLoading}
        onClick={onClick}
      >
        <div className="flex flex-row items-center flex-1 h-full">
          <span className="flex justify-center items-center self-stretch bg-white px-4">
            <img
              src="/static/images/pages/login/google-icon.png"
              alt="Google icon"
              width="24"
            />
          </span>
          <span className="flex-1 ml-3 text-white text-center">
            Sign {isSignIn ? 'in' : 'up'} with Google
          </span>
        </div>
      </Button>

      <style jsx>{`
        .root :global(.pt-google-button) {
          background-color: #4285f4;
          border-radius: 2px;
          padding: 2px;
          padding-right: 10px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

GoogleButton.propTypes = {
  onClick: PropTypes.func.isRequired,

  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSignIn: PropTypes.bool,
};

GoogleButton.defaultProps = {
  className: '',
  disabled: false,
  isLoading: false,
  isSignIn: true,
};

export default GoogleButton;
