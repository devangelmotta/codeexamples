import PropTypes from 'prop-types';

const Loader = ({ color }) => {
  return (
    <span className="root">
      <style jsx>
        {`
          .root {
            display: inline-block;
            height: 32px;
            width: 32px;
          }

          .root:after {
            animation: root 1.2s linear infinite;
            border-radius: 50%;
            content: ' ';
            display: block;
            height: 24px;
            margin: 8px;
            width: 24px;
          }

          @keyframes root {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <style jsx>
        {`
          .root:after {
            border: 2px solid ${color};
            border-color: ${color} transparent ${color} transparent;
          }
        `}
      </style>
    </span>
  );
};

Loader.propTypes = {
  color: PropTypes.string,
};

Loader.defaultProps = {
  color: 'white',
};

export default Loader;
