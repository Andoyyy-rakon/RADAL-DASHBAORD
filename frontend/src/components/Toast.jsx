import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: {
        container: 'bg-white dark:bg-slate-800 border-green-500/50',
        icon: 'text-green-500',
        bg: 'bg-green-50 dark:bg-green-500/10'
    },
    error: {
        container: 'bg-white dark:bg-slate-800 border-red-500/50',
        icon: 'text-red-500',
        bg: 'bg-red-50 dark:bg-red-500/10'
    }
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className="fixed top-6 right-6 z-[999] animate-in slide-in-from-right-10 fade-in duration-500">
      <div className={`flex items-center gap-4 p-4 rounded-2xl shadow-2xl border-2 ${currentStyle.container} min-w-[320px] max-w-md`}>
        <div className={`p-2 rounded-xl ${currentStyle.bg}`}>
          {type === 'success' ? <CheckCircle2 size={24} className={currentStyle.icon} /> : <AlertCircle size={24} className={currentStyle.icon} />}
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-black text-slate-800 dark:text-white capitalize mb-0.5">
            {type}
          </p>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {message}
          </p>
        </div>

        <button 
          onClick={onClose}
          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
