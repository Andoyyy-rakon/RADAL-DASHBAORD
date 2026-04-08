import React from 'react';
import { assets } from '../assets/asset';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-[#F5F7FB] dark:bg-slate-900 flex items-center justify-center transition-colors duration-500">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 md:w-48 md:h-48 bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-2xl animate-splash flex items-center justify-center mb-8 relative">
           {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-[#FACC15] blur-3xl opacity-20 -z-10 rounded-full animate-pulse"></div>
          
          <img 
            src={assets.Ligtaslogo} 
            alt="Ligtas Logo" 
            className="w-full h-full object-contain animate-float"
          />
        </div>
        
        <div className="space-y-2 text-center overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-800 dark:text-white translate-y-full animate-[slide-up_0.6s_ease-out_0.2s_forwards]">
            LIGTAS
          </h1>
          <p className="text-slate-400 dark:text-slate-500 font-bold tracking-widest text-xs uppercase translate-y-full animate-[slide-up_0.6s_ease-out_0.4s_forwards]">
            Emergency Response System
          </p>
        </div>

        {/* Loading bar */}
        <div className="mt-12 w-48 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 bg-[#FACC15] w-full -translate-x-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          to { transform: translateY(0); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
