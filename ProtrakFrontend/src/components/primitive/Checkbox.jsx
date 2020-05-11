import PropTypes from 'prop-types';
import classnames from 'classnames';

const Checkbox = ({ name, checked, onChange, error, text, variant }) => {
  const checkboxElementId = `pt-checkbox__input-${name}`;

  return (
    <label
      className={classnames(
        'pt-checkbox',
        variant,
        error && 'pt-checkbox--error',
        text && 'pt-checkbox--with-text',
      )}
      htmlFor={checkboxElementId}
    >
      <input
        id={checkboxElementId}
        name={name}
        type="checkbox"
        checked={checked}
        className="pt-checkbox__input"
        onChange={onChange}
      />
      <div className="pt-checkbox__checkmark align-middle">
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            fill="#F5F5F5"
            version="1.1"
            viewBox="0 0 45.701 45.7"
            xmlSpace="preserve"
          >
            <path d="M20.687 38.332a5.308 5.308 0 01-7.505 0L1.554 26.704A5.306 5.306 0 119.059 19.2l6.928 6.927a1.344 1.344 0 001.896 0L36.642 7.368a5.308 5.308 0 017.505 7.504l-23.46 23.46z" />
          </svg>
        )}
      </div>
      {text && <span className="pt-checkbox__text ml-2">{text}</span>}

      <style jsx>{`
        .pt-checkbox {
          align-items: center;
          cursor: pointer;
          position: relative;
          user-select: none;
        }

        .pt-checkbox--default {
          display: inline-flex;
        }

        .pt-checkbox--with-text {
          display: flex;
        }

        .pt-checkbox__input {
          cursor: pointer;
          display: none;
          height: 0;
          opacity: 0;
          position: absolute;
          width: 0;
        }

        .pt-checkbox__checkmark {
          background-color: white;
          border-radius: 7px;
          border: 2px solid var(--blue-pt-100);
          display: inline-block;
          height: 18px;
          padding: 4px;
          width: 18px;
        }

        .pt-checkbox--gray .pt-checkbox__checkmark {
          border: 2px solid var(--gray-pt-500);
        }

        .pt-checkbox--error .pt-checkbox__checkmark {
          border: 2px solid var(--red-pt-100);
        }

        /* When the checkbox is checked - DEFAULT */
        .pt-checkbox--default input:checked ~ .pt-checkbox__checkmark {
          background-color: var(--blue-pt-100);
          border: 0;
        }

        /* When the checkbox is checked - ERROR */
        .pt-checkbox--error input:checked ~ .pt-checkbox__checkmark {
          background-color: var(--red-pt-100);
          border: 0;
        }

        /* When the checkbox is checked - GRAY */
        .pt-checkbox--gray input:checked ~ .pt-checkbox__checkmark {
          background-color: var(--gray-pt-500);
          border: 0;
        }

        .pt-checkbox__text {
          flex: 1;
        }

        .pt-checkbox--default .pt-checkbox__text {
          color: var(--blue-pt-100);
        }

        .pt-checkbox--gray .pt-checkbox__text {
          color: var(--gray-pt-500);
        }

        .pt-checkbox--error .pt-checkbox__text {
          color: var(--red-pt-100);
        }
      `}</style>
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  error: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  variant: PropTypes.oneOf([
    'pt-checkbox--default',
    'pt-checkbox--blue',
    'pt-checkbox--gray',
  ]),
};

Checkbox.defaultProps = {
  error: false,
  text: '',
  variant: 'pt-checkbox--default',
};

export default Checkbox;
