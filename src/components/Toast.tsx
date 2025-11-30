import React from 'react';
import classNames from 'classnames';

type ToastProps = {
  message: string;
  type: 'success' | 'info' | 'danger' | 'warning';
  show: boolean;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, show, onClose }) => {
  return (
    <div
      className={classNames(
        'toast app-toast align-items-center text-white',
        `bg-${type}`,
        { show }
      )}
      style={{}}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn btn-sm btn-light ms-2"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          <span className="visually-hidden">Dismiss</span>
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default Toast;
