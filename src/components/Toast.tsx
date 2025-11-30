import React from 'react';
import classNames from 'classnames';

interface ToastProps {
  message: string;
  type: 'success' | 'info' | 'warning';
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, show, onClose }) => {
  return (
    <div
      className="toast-container position-fixed bottom-0 start-0 p-3"
      style={{ zIndex: 1055, marginBottom: '4rem' }} // offset above tabs
    >
      <div
        className={classNames(
          'toast align-items-center border-0',
          show ? 'show fade' : 'hide',
          {
            'bg-success text-white': type === 'success',
            'bg-info text-white': type === 'info',
            'bg-warning text-dark': type === 'warning',
          }
        )}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
