import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { componentDidMount } from '~/utils/utils';
import Button from './Button';

const Dropdown = ({
  options,
  placeholder,
  onOptionClickHandler,
  variant,
  orientation,
  CustomButton,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  componentDidMount(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = useCallback(e => {
    // inside click
    if (ref.current.contains(e.target)) {
      return;
    }

    // outside click
    setOpen(false);
  }, []);

  const handleButtonClick = useCallback(() => {
    setOpen(currentValue => !currentValue);
  }, []);

  const handleOptionClick = useCallback(selectedOption => {
    onOptionClickHandler(selectedOption);
    setOpen(false);
  }, []);

  return (
    <div
      className={classnames('pt-dropdown inline-block text-center', variant)}
      ref={ref}
    >
      {CustomButton ? (
        <div className="cursor-pointer" onClick={handleButtonClick}>
          {CustomButton}
        </div>
      ) : (
        <Button className="pt-dropdown__button" size="sm" onClick={handleButtonClick}>
          {placeholder}
        </Button>
      )}

      {open && (
        <div className="pt-dropdown__menu">
          {variant === 'pt-dropdown--dark' && (
            <div className="py-1 block md:hidden">
              <img
                src="/static/images/icons/close-outline.svg"
                alt="Close icon"
                className="cursor-pointer w-8 h-8 ml-auto"
                onClick={handleButtonClick}
              />
            </div>
          )}

          {options.map((option, i) => {
            return (
              <div
                key={`pt-dropdown__menu__option${i}`}
                className={classnames(
                  'pt-dropdown__menu__option flex justify-start cursor-pointer items-center',
                  option.className,
                )}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.icon && <span className="mr-3">{option.icon}</span>}

                <span className="flex flex-col items-start">
                  <span>{option.label}</span>
                  <small className="pt-dropdown__menu__option__description">
                    {option.description}
                  </small>
                </span>
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .pt-dropdown {
          position: relative;
        }

        .pt-dropdown :global(.pt-dropdown__button) {
          background-image: url('/static/images/icons/arrow-white.svg');
          background-repeat: no-repeat;
          /* Better placement regardless of browsers compatibility */
          background-position: 85%;
          background-position: calc(100% - 15px);
          padding-right: 40px;
        }

        .pt-dropdown__menu {
          position: absolute;
          width: 230px;
          z-index: 600;
        }

        .pt-dropdown--dark {
          position: static;
        }

        .pt-dropdown--dark .pt-dropdown__menu {
          background-color: var(--gray-pt-300);
          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.28);
          color: white;
          height: calc(100vh - var(--header-height));
          margin-top: 18px;
          width: 100vw;
        }

        .pt-dropdown--light .pt-dropdown__menu {
          background-color: var(--gray-pt-400);
          border-radius: 5px;
          border: 1px solid var(--gray-pt-100);
          box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.21);
          color: var(--gray-pt-200);
          margin-top: 5px;
        }

        .pt-dropdown__menu__option {
          padding: 10px 15px;
        }

        .pt-dropdown--light .pt-dropdown__menu__option {
          border-bottom: 1px solid #ddd;
        }

        .pt-dropdown--light .pt-dropdown__menu__option:last-child {
          border-bottom: none;
        }

        .pt-dropdown--light .pt-dropdown__menu__option:hover {
          background-color: var(--gray-pt-100);
        }

        .pt-dropdown__menu__option :global(img) {
          height: 22px;
          width: 22px;
        }

        .pt-dropdown--dark .pt-dropdown__menu__option__description {
          color: var(--gray-pt-100);
        }

        .pt-dropdown--light .pt-dropdown__menu__option__description {
          color: var(--gray-pt-200);
        }

        /* Medium devices [md] */
        @media (min-width: 768px) {
          .pt-dropdown--dark {
            position: relative;
          }

          .pt-dropdown--dark .pt-dropdown__menu {
            border-radius: 10px;
            left: -100%;
            height: auto;
            margin-top: 11px;
            width: 330px;
          }

          .pt-dropdown--dark .pt-dropdown__menu:before {
            border: 0.9em solid transparent;
            border-bottom-color: var(--gray-pt-300);
            border-top: 0;
            content: '';
            height: 0;
            left: 46%;
            margin-right: -15px;
            margin-top: -15px;
            position: absolute;
            top: 7px;
            width: 0;
          }
        }
      `}</style>

      <style jsx>
        {`
          .pt-dropdown__menu {
            ${orientation}: 0px;
          }
        `}
      </style>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      className: PropTypes.string,
      icon: PropTypes.element,
    }),
  ).isRequired,
  onOptionClickHandler: PropTypes.func.isRequired,

  CustomButton: PropTypes.node,
  orientation: PropTypes.oneOf(['left', 'right']),
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['pt-dropdown--light', 'pt-dropdown--dark']),
};

Dropdown.defaultProps = {
  CustomButton: undefined,
  orientation: 'left',
  placeholder: '',
  variant: 'pt-dropdown--light',
};

export default Dropdown;
