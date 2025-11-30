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
        'toast align-items-center text-white border-0 position-fixed',
        `bg-${type}`,
        { show }
      )}
      style={{ bottom: '4rem', left: '1rem', zIndex: 1050 }}
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
  );
};

export default Toast;
