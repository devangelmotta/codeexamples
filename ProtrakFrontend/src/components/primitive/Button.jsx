import { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Router from 'next/router';

import Loader from './Loader';

const Button = ({
  children,

  className,
  disabled,
  link,
  icon,
  isLoading,
  size,
  type,
  variant,
  'x-align': xAlign,
  onClick,
}) => {
  const handleButtonClick = link
    ? useCallback(e => {
        if (disabled) {
          e.preventDefault();
          return;
        }

        if (link.isExternalUrl) return;

        e.preventDefault();
        Router.push(link.href);
      }, [])
    : onClick;

  const getHtmlAttrs = useCallback(() => {
    if (link) {
      const htmlAttrs = { ...link };
      delete htmlAttrs.isExternalUrl;

      return htmlAttrs;
    }

    return { type };
  }, []);

  const Element = link ? 'a' : 'button';

  return (
    <Element
      className={classnames(
        'pt-button',
        variant,
        `pt-button--${size}`,
        isLoading && 'pt-button--loading',
        disabled && 'pt-button--disabled',
        link && 'inline-block',
        className,
      )}
      disabled={isLoading || disabled}
      onClick={handleButtonClick}
      {...getHtmlAttrs()} // eslint-disable-line react/jsx-props-no-spreading
    >
      <div className={classnames('flex flex-row items-center h-full', xAlign)}>
        {icon && <span className="pt-button__icon mr-3">{icon}</span>}
        {children}
        {isLoading && (
          <span className="ml-3">
            <Loader />
          </span>
        )}
      </div>

      <style jsx>{`
        :global(.pt-button) {
          border-radius: 5px;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 16px;
          font-weight: 100;
          height: 63px;
          padding: 0 25px;
          text-align: center;
          transition: all 1s;
        }

        :global(.pt-button:hover) {
          opacity: 0.8;
        }

        :global(.pt-button--xs) {
          font-size: 12px;
          height: 24px;
          padding: 0 14px;
        }

        :global(.pt-button--sm) {
          height: 48px;
        }

        :global(.pt-button--md) {
          height: 63px;
        }

        :global(.pt-button--default),
        :global(.pt-button--dark-blue) {
          background-color: var(--blue-pt-100);
          color: white;
        }

        :global(.pt-button--green) {
          background-color: var(--green-pt-100);
          color: white;
        }

        :global(.pt-button--red) {
          background-color: var(--red-pt-100);
          color: white;
        }

        :global(.pt-button--gray) {
          background-color: var(--gray-pt-100);
          color: var(--blue-pt-100);
        }

        :global(.pt-button--light-gray) {
          background-color: var(--gray-pt-400);
          color: var(--green-pt-200);
        }

        :global(.pt-button--yellow) {
          background-color: var(--yellow-pt-400);
          color: var(--gray-pt-300);
        }

        :global(.pt-button--loading),
        :global(.pt-button--disabled) {
          opacity: 0.7;
        }

        :global(.pt-button--loading) {
          cursor: progress;
        }

        :global(.pt-button--disabled) {
          cursor: not-allowed;
        }

        .pt-button__icon :global(img) {
          max-width: none;
          width: 18px;
        }
      `}</style>
    </Element>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  className: PropTypes.string,
  disabled: PropTypes.bool,
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    rel: PropTypes.string,
    target: PropTypes.string,
    download: PropTypes.bool,
    isExternalUrl: PropTypes.bool,
  }),
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf([
    'pt-button--default',
    'pt-button--dark-blue',
    'pt-button--green',
    'pt-button--gray',
    'pt-button--light-gray',
    'pt-button--red',
    'pt-button--yellow',
  ]),
  'x-align': PropTypes.oneOf(['justify-start', 'justify-center', 'justify-between']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  link: undefined,
  icon: null,
  isLoading: false,
  size: 'md',
  type: 'button',
  variant: 'pt-button--default',
  'x-align': 'justify-center',
  onClick: undefined,
};

export default Button;
