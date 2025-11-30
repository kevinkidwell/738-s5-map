import React from 'react';
import classNames from 'classnames';

interface ToastProps {
  message: string;
  type: 'success' | 'info' | 'warning';
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      <div
        className={classNames(
          'toast show align-items-center text-white border-0',
          {
            'bg-success': type === 'success',
            'bg-info': type === 'info',
            'bg-warning': type === 'warning',
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
