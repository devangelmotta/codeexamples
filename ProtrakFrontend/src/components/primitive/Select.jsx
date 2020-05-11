import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from './Input';

const Select = ({
  name,
  options,
  value,
  onChange,
  error,
  icon,
  placeholder,
  onFocus,
  disabled,
  variant,
  CustomOption,
  orientation,
}) => {
  const [showCustomOptions, setShowCustomOptions] = useState(false);

  const getLabel = useCallback((value_, options_) => {
    const selectedOption = options_.find(element => element.value === value_);
    if (!selectedOption) return '';
    return selectedOption.label;
  }, []);

  return (
    <div>
      <div
        className={classnames(
          'pt-select',
          variant,
          error && 'pt-select--error',
          icon && 'pt-select--with-icon',
        )}
      >
        {variant === 'pt-select--default' && (
          <select
            name={name}
            value={value}
            className="pt-select__element"
            onChange={onChange}
            onFocus={onFocus}
            disabled={disabled}
          >
            {placeholder && (
              <option className="pt-select__placeholder" value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        )}
        {variant === 'pt-select--custom' && (
          <div className="relative">
            <div
              className="pt-select__element cursor-pointer"
              onClick={() => {
                setShowCustomOptions(currentValue => !currentValue);
              }}
            >
              {getLabel(value, options) || placeholder || ''}
            </div>
            <div
              className={classnames(
                'pt-select--custom__options',
                'shadow-sm rounded-md overflow-hidden border border-gray-pt-100',
                showCustomOptions ? 'block' : 'hidden',
              )}
            >
              {options.map(option => {
                return (
                  <CustomOption
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    data={option.data}
                    onClick={() => {
                      setShowCustomOptions(false);
                      onChange(option.value);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Input.ErrorMessage>{error}</Input.ErrorMessage>

      <style jsx>{`
        .pt-select {
          border-bottom: 3px solid var(--gray-pt-100);
          color: var(--pt-gray-500);
        }

        .pt-select--error {
          border-bottom: 3px solid var(--red-pt-100);
        }

        .pt-select__element {
          /* Better placement regardless of browsers compatibility*/
          background: url('/static/images/icons/arrow-dark.svg') transparent no-repeat
            98.5%;
          /* Some browsers will not display the caret when using calc */
          background: url('/static/images/icons/arrow-dark.svg') transparent no-repeat
            calc(100% - 10px);

          appearance: none;
          border-radius: 0;
          font-weight: 100;
          height: 47px;
          padding: 0 30px 0px 0px;
          width: 100%;
        }

        .pt-select__element {
          color: var(--gray-pt-100);
        }

        .pt-select--error .pt-select__element {
          color: var(--red-pt-100);
        }

        /* Default Select Arrow Hiding For IE */
        .pt-select__element::-ms-expand {
          display: none;
        }

        .pt-select__element:focus {
          border: 0;
          box-shadow: 0;
        }

        .pt-select__element:disabled {
          cursor: not-allowed;
        }

        .pt-select--custom__options {
          left: 0;
          position: absolute;
          right: 0;
          z-index: 500;
        }
      `}</style>

      <style jsx>
        {`
          .pt-select--with-icon .pt-select__element {
            background-image: url('/static/images/icons/${icon}.svg'), url('/static/images/icons/arrow-dark.svg');
            /* Better placement regardless of browsers compatibility*/
            background-position: 0, 98.5%;
            /* Some browsers will not display the caret when using calc */
            background-position: 0, calc(100% - 10px);

            background-color: transparent;
            background-repeat: no-repeat;
            padding: 10px 30px;
          }

          .pt-select--custom__options {
            ${orientation === 'up' ? 'bottom: 115%;' : ' top: 115%;'}
          }
        `}
      </style>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      data: PropTypes.shape({}),
    }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,

  CustomOption: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['pt-select--default', 'pt-select--custom']),
  orientation: PropTypes.oneOf(['down', 'up']),
  onFocus: PropTypes.func,
};

Select.defaultProps = {
  CustomOption: undefined,
  disabled: false,
  error: '',
  icon: '',
  onFocus: undefined,
  orientation: 'down',
  placeholder: '',
  variant: 'pt-select--default',
};

export default Select;
