import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div id="toast-container" className="toast-container">
      {toasts.map((toast) => {
        const iconClass =
          toast.type === 'success'
            ? 'fa-check-circle'
            : toast.type === 'error'
            ? 'fa-exclamation-circle'
            : 'fa-info-circle';

        return (
          <div key={toast.id} className={`toast toast-${toast.type || 'info'}`}>
            <i className={`fas ${iconClass}`}></i>
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
