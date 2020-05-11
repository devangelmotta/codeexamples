import PropTypes from 'prop-types';
import classnames from 'classnames';

const Label = ({ children, className, size, variant, icon, onClick }) => {
  return (
    <div
      className={classnames(
        'pt-label inline-flex flex-row items-center',
        `pt-label--${size}`,
        icon ? 'justify-start' : 'justify-center font-bold',
        onClick ? 'cursor-pointer' : 'cursor-default',
        variant,
        className,
      )}
      onClick={onClick}
    >
      {icon && <span className="pt-label__icon mr-2">{icon}</span>}
      {children}

      <style jsx>{`
        .pt-label {
          font-size: 12px;
        }

        .pt-label--sm {
          border-radius: 11px;
          height: 22px;
          padding: 0 16px;
        }

        .pt-label--md {
          border-radius: 15px;
          height: 30px;
          padding: 0 20px;
        }

        .pt-label--default,
        .pt-label--blue {
          background-color: #a1cafc;
          color: #2453a5;
        }

        .pt-label--dark-blue {
          background-color: var(--blue-pt-100);
          color: #ffffff;
        }

        .pt-label--light-yellow {
          background-color: var(--yellow-pt-300);
          color: var(--yellow-pt-100);
        }

        .pt-label--dark-yellow {
          background-color: var(--yellow-pt-200);
          color: #8c6513;
        }

        .pt-label--light-green {
          background-color: #a1fcb9;
          color: #24a555;
        }

        .pt-label--dark-green {
          background-color: var(--green-pt-100);
          color: #1c6618;
        }

        .pt-label--red {
          background-color: var(--red-pt-100);
          color: #661818;
        }

        .pt-label--gray {
          background-color: var(--gray-pt-200);
          color: #ffffff;
        }

        .pt-label__icon :global(img) {
          max-width: none;
          width: 12px;
        }
      `}</style>
    </div>
  );
};

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  className: PropTypes.string,
  icon: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md']),
  variant: PropTypes.oneOf([
    'pt-label--default',
    'pt-label--blue',
    'pt-label--dark-blue',
    'pt-label--light-yellow',
    'pt-label--dark-yellow',
    'pt-label--light-green',
    'pt-label--dark-green',
    'pt-label--red',
    'pt-label--gray',
  ]),
  onClick: PropTypes.func,
};

Label.defaultProps = {
  className: '',
  icon: null,
  size: 'md',
  variant: 'pt-label--default',
  onClick: undefined,
};

export default Label;
