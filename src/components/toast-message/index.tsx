interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

import { CheckCircle2, X } from 'lucide-react';
import React, { useEffect } from 'react'
import { CN } from '../../utils';

const Toast: React.FC<ToastProps>= ({
  message,
  show,
  onClose,
  duration = 2500,
}) => {

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  return (
    <div
      className={CN(
        "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-white shadow-lg">
        <CheckCircle2 className="h-5 w-5 text-green-400" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Toast
