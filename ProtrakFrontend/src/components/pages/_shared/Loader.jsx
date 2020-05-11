import PropTypes from 'prop-types';

import { Loader } from '~/components/primitive';

const LoaderBox = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="root flex p-8 items-center justify-center">
      <Loader color="gray" />

      <style jsx>{`
        .root {
          background-color: rgba(255, 255, 255, 0.5);
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 500;
        }
      `}</style>
    </div>
  );
};

LoaderBox.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoaderBox;
