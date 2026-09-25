import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title?: string;
  message: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Auto-dismiss after 4.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [toast.id]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 150);
  };

  return (
    <div
      role="alert"
      className={`pointer-events-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/[0.08] p-4 flex items-start gap-3 transition-all duration-200 ${
        isClosing 
          ? 'opacity-0 scale-95 translate-y-2' 
          : 'animate-in fade-in slide-in-from-bottom-3 duration-200'
      }`}
    >
      {toast.type === 'success' && (
        <CheckCircle2 className="w-5 h-5 text-[#0E9F6E] shrink-0 mt-0.5" />
      )}
      {toast.type === 'info' && (
        <Info className="w-5 h-5 text-[#102A43] shrink-0 mt-0.5" />
      )}
      {toast.type === 'warning' && (
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      )}

      <div className="flex-1 min-w-0 pr-1">
        <div className="text-xs font-bold text-[#1C1C1E] leading-snug">
          {toast.title || toast.message}
        </div>
        {(toast.title ? toast.message || toast.description : toast.description) && (
          <div className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">
            {toast.title ? toast.message || toast.description : toast.description}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleClose();
        }}
        aria-label="Cancel notification"
        title="Dismiss notification"
        className="w-7 h-7 -mr-1 -mt-1 rounded-full text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.06] active:scale-90 flex items-center justify-center transition-all cursor-pointer shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};
