import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, confirmColor = "bg-[#FACC15] hover:bg-yellow-500", iconColor = "text-yellow-500", iconBg = "bg-yellow-50 dark:bg-yellow-500/10" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
            <AlertCircle className={iconColor} size={32} />
          </div>
          
          <h2 className="text-2xl font-black text-center text-slate-800 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-center font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3.5 rounded-xl font-bold text-slate-900 shadow-lg transition-all active:scale-95 ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
      
      {/* Overlay click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default ConfirmModal;
