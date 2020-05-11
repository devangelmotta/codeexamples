import { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Modal = ({ children, visible, onCloseHandler, className, showCloseButton }) => {
  const backdropRef = useRef(null);

  const handleBackdropClick = useCallback(e => {
    if (backdropRef && backdropRef.current === e.target) {
      closeModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    onCloseHandler(false);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="root p-5" ref={backdropRef} onClick={handleBackdropClick}>
      <div
        className={classnames(
          'content rounded-lg shadow-lg bg-white p-6 md:p-8 overflow-auto mx-auto relative max-h-full',
          className,
        )}
      >
        {showCloseButton && (
          <img
            src="/static/images/icons/close-outline.svg"
            className="close-button"
            alt="Close icon"
            onClick={closeModal}
          />
        )}

        {children}
      </div>

      <style jsx>{`
        .root {
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          bottom: 0;
          display: flex;
          justify-content: center;
          left: 0;
          overflow: auto;
          position: fixed;
          right: 0;
          top: 0;
          z-index: 1000;
        }

        .content {
          max-width: 673px;
        }

        .close-button {
          cursor: pointer;
          position: absolute;
          right: 5px;
          top: 5px;
          width: 32px;
        }
      `}</style>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,

  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
};

Modal.defaultProps = {
  className: '',
  showCloseButton: false,
};

export default Modal;
