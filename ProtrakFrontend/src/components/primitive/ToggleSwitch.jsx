import { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ name, checked, onChange }) => {
  const ref = useRef(undefined);

  const handleToggleClick = useCallback(() => {
    ref.current.click();
  }, []);

  return (
    <div className="pt-toggle-switch">
      <input
        className="pt-toggle-switch__input"
        type="checkbox"
        name={name}
        checked={checked}
        ref={ref}
        onChange={onChange}
      />
      <span className="pt-toggle-switch__slider" onClick={handleToggleClick}>
        &nbsp;
      </span>

      <style jsx>
        {`
          .pt-toggle-switch {
            display: inline-block;
            height: 24px;
            position: relative;
            width: 45px;
          }

          .pt-toggle-switch__input {
            height: 0;
            opacity: 0;
            width: 0;
          }

          .pt-toggle-switch__slider {
            background-color: #ffffff;
            border-radius: 34px;
            border: 1px solid var(--gray-pt-100);
            bottom: 0;
            cursor: pointer;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: 0.4s;
          }

          .pt-toggle-switch__slider:before {
            background-color: var(--blue-pt-100);
            border-radius: 50%;
            bottom: 1px;
            content: '';
            height: 20px;
            left: 2px;
            position: absolute;
            transition: 0.4s;
            width: 20px;
          }

          .pt-toggle-switch__input:checked + .pt-toggle-switch__slider {
            background-color: #ffffff;
          }

          .pt-toggle-switch__input:checked + .pt-toggle-switch__slider:before {
            transform: translateX(19px);
          }
        `}
      </style>
    </div>
  );
};

ToggleSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

ToggleSwitch.defaultProps = {};

export default ToggleSwitch;
