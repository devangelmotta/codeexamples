import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Input = ({
  htmlAttrs,
  value,
  onChange,

  disabled,
  className,
  error,
  icon,
  label,
  showErrorMessage,
  variant,
  onBlur,
  onFocus,
  onKeyUp,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isInputPassword = variant === 'pt-input--password';

  const renderLeftIcon = useCallback(() => {
    if (isInputPassword) {
      return (
        <span className="pt-input__icon pt-input__icon--left">
          <img src="/static/images/icons/lock.svg" alt="Lock icon" />
        </span>
      );
    }

    if (icon) {
      return <span className="pt-input__icon pt-input__icon--left">{icon}</span>;
    }

    return null;
  }, []);

  const renderInputElement = useCallback((value_, showPassword_) => {
    const Element = variant === 'pt-input--textarea' ? 'textarea' : 'input';

    const getType = () => {
      if (isInputPassword) {
        return showPassword_ ? 'text' : 'password';
      }

      return htmlAttrs.type || 'text';
    };

    return (
      <Element
        {...htmlAttrs} // eslint-disable-line react/jsx-props-no-spreading
        type={getType()}
        value={value_}
        disabled={disabled}
        className="pt-input__element"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
      />
    );
  }, []);

  const renderRightIcon = useCallback(showPassword_ => {
    if (isInputPassword) {
      return (
        <span
          className="pt-input__icon pt-input__icon--right"
          onClick={() => {
            setShowPassword(currentState => !currentState);
          }}
        >
          {showPassword_ ? (
            <img src="/static/images/icons/eye-off.svg" alt="Hide password" />
          ) : (
            <img src="/static/images/icons/eye.svg" alt="Show password" />
          )}
        </span>
      );
    }

    return null;
  }, []);

  return (
    <div className="root">
      <Label error={!!error}>{label}</Label>
      <div
        className={classnames('pt-input', variant, error && 'pt-input--error', className)}
      >
        {renderLeftIcon()}
        {renderInputElement(value, showPassword)}
        {renderRightIcon(showPassword)}
      </div>
      <ErrorMessage show={showErrorMessage}>{error}</ErrorMessage>

      <style jsx>{`
        .pt-input {
          align-items: center;
          background-color: white;
          border-bottom: 3px solid var(--gray-pt-100);
          display: flex;
          flew-wrap: no-wrap;
          flex-direction: row;
          flex: auto auto auto;
          height: 50px;
          overflow: hidden;
          width: 100%;
        }

        .pt-input--error {
          border-bottom: 3px solid var(--red-pt-100);
        }

        .pt-input--textarea {
          font-size: 18px;
          height: auto;
        }

        :global(.pt-input__icon) {
          align-items: center;
          display: inline-flex;
          flex-shrink: 0;
          width: 36px;
        }

        :global(.pt-input__icon--left) {
          justify-content: flex-start;
        }

        :global(.pt-input__icon--right) {
          cursor: pointer;
          justify-content: flex-end;
        }

        :global(.pt-input__icon > img) {
          height: 24px;
          width: 24px;
        }

        :global(.pt-input__element) {
          border: 0;
          color: var(--gray-pt-300);
          flex: 1;
          outline: 0;
          padding: 10px 0;
        }

        .pt-input--textarea :global(.pt-input__element) {
          height: 200px;
          resize: none;
        }

        .pt-input--comment {
          border: 1px solid #c5cdd4;
          border-radius: 5px;
        }

        .pt-input--comment :global(.pt-input__element) {
          padding: 15px 21px;
        }

        .pt-input--error :global(.pt-input__element) {
          color: var(--red-pt-100);
        }

        :global(.pt-input__element::placeholder) {
          color: var(--gray-pt-100);
          font-weight: 200;
        }

        :global(.pt-input__element:focus::placeholder) {
          color: var(--blue-pt-100);
          font-weight: 200;
        }

        .pt-input--error :global(.pt-input__element::placeholder) {
          color: var(--red-pt-100);
        }

        :global(.pt-input__element:disabled) {
          background: none;
          color: var(--gray-pt-100);
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,

  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  htmlAttrs: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  icon: PropTypes.element,
  label: PropTypes.string,
  showErrorMessage: PropTypes.bool,
  variant: PropTypes.oneOf([
    'pt-input--default',
    'pt-input--password',
    'pt-input--textarea',
  ]),
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  icon: null,
  htmlAttrs: { type: 'text' },
  label: '',
  showErrorMessage: false,
  variant: 'pt-input--default',
  onBlur: undefined,
  onKeyUp: undefined,
  onFocus: undefined,
};

// --- Components ---

const Label = ({ children, error, color }) => {
  const generateColorName = useCallback((color_, error_) => {
    if (error_) {
      return 'var(--red-pt-100)';
    }

    if (color === 'gray') {
      return 'var(--gray-pt-200)';
    }

    return 'black';
  }, []);

  if (!children) {
    return null;
  }

  return (
    <p className={classnames('pt-input-label', error && 'pt-input-label--error')}>
      {children}

      <style jsx>{`
        .pt-input-label {
          font-size: 17px;
          font-weight: bold;
        }
      `}</style>

      <style jsx>{`
        .pt-input-label {
          color: ${generateColorName(color, error)};
        }
      `}</style>
    </p>
  );
};

Label.propTypes = {
  children: PropTypes.string,
  color: PropTypes.oneOf(['black', 'gray']),
  error: PropTypes.bool,
};

Label.defaultProps = {
  color: 'black',
  children: undefined,
  error: false,
};

const ErrorMessage = ({ children, show }) => {
  if (!children || !show) {
    return null;
  }

  return (
    <div className="mt-4 mb-2">
      <span className="pt-input-error-message text-white p-2 text-sm">
        {children}

        <style jsx>{`
          .pt-input-error-message {
            background-color: var(--red-pt-100);
            border-radius: 0.4em;
            display: block;
            position: relative;
          }

          .pt-input-error-message:before {
            content: '';
            position: absolute;
            top: 0;
            left: 10px;
            width: 0;
            height: 0;
            border: 0.5em solid transparent;
            border-bottom-color: var(--red-pt-100);
            border-top: 0;
            margin-top: -5px;
            margin-right: -5px;
          }
        `}</style>
      </span>
    </div>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.string,
  show: PropTypes.bool,
};

ErrorMessage.defaultProps = {
  children: undefined,
  show: true,
};

Input.ErrorMessage = ErrorMessage;
Input.Label = Label;

export default Input;
