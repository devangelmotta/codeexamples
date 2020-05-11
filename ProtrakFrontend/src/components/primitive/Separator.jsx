import { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Separator = ({
  className,
  color,
  orientation,
  responsive,
  size,
  sizeBottom,
  sizeTop,
  width,
}) => {
  const generateResponsiveClassName = useCallback(responsive_ => {
    if (!responsive_) return '';

    const breakpointName = responsive_[2] || 'md';

    return `w-full ${breakpointName}:w-auto mx-0 ${breakpointName}:mx-${responsive_[0]} my-${responsive_[1]} ${breakpointName}:my-0`;
  }, []);

  const generateMarginClassName = useCallback((size_, orientation_) => {
    if (!Number.isInteger(size_)) return '';

    if (orientation_ === 'h') {
      return `my-${size_} h-px`;
    }

    return `mx-${size_} w-px`;
  }, []);

  const generateColorClassName = useCallback(
    (color_, width_, orientation_, responsive_) => {
      if (color_ === 'gray') {
        const borderWidth = Number.isInteger(width_) ? `-${width_}` : '';

        if (responsive_) {
          const breakpointName = responsive_[2] || 'md';
          const borderProperties = `border-t${borderWidth} ${breakpointName}:border-t-0 ${breakpointName}:border-l${borderWidth}`;

          return `border-gray-400 ${borderProperties}`;
        }

        const borderSide = orientation_ === 'h' ? 'border-t' : 'border-l';
        return `border-gray-400 ${borderSide}${borderWidth}`;
      }

      return '';
    },
    [],
  );

  return (
    <Fragment>
      <div
        className={classnames(
          generateMarginClassName(size, orientation),
          generateColorClassName(color, width, orientation, responsive),
          generateResponsiveClassName(responsive),
          Number.isInteger(sizeTop) && `mt-${sizeTop}`,
          Number.isInteger(sizeBottom) && `mb-${sizeBottom}`,
          className,
        )}
      />

      <style jsx>
        {`
          div {
            flex-shrink: 0;
          }
        `}
      </style>
    </Fragment>
  );
};

Separator.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['gray', 'transparent']),
  orientation: PropTypes.oneOf(['h', 'v']),
  responsive: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // [x, y, breakpoint name]
  ),
  size: PropTypes.number,
  sizeBottom: PropTypes.number,
  sizeTop: PropTypes.number,
  width: PropTypes.number,
};

Separator.defaultProps = {
  className: '',
  color: 'transparent',
  orientation: 'h',
  responsive: undefined,
  size: undefined,
  sizeBottom: undefined,
  sizeTop: undefined,
  width: undefined,
};

export default Separator;
