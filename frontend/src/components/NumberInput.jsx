import React from 'react';
import { Minus, Plus } from 'lucide-react';

const NumberInput = ({ value, onChange, min = 1, max = 30, label, name = "quantity" }) => {
  const increment = (e) => {
    e.stopPropagation();
    if (value < max) {
      onChange({ target: { name, value: Number(value) + 1 } });
    }
  };

  const decrement = (e) => {
    e.stopPropagation();
    if (value > min) {
      onChange({ target: { name, value: Number(value) - 1 } });
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      onChange({ target: { name, value: "" } });
      return;
    }

    const numVal = parseInt(val, 10);
    if (isNaN(numVal)) return;

    // We allow typing values out of range temporarily but cap them on blur or final submit?
    // Actually, let's cap them immediately for a better UX, or just let them type.
    // Cap immediately is safer:
    const cappedVal = Math.min(Math.max(numVal, min), max);
    onChange({ target: { name, value: cappedVal } });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {label && <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">{label}</label>}
      <div className="flex items-center mt-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-inner focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#FACC15] transition-all overflow-hidden w-full">
        <button
          type="button"
          onClick={decrement}
          className="p-2.5 shrink-0 rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:text-red-500 dark:hover:text-red-400 transition-all active:scale-90"
        >
          <Minus size={18} strokeWidth={3} />
        </button>
        
        <input
          type="number"
          name={name}
          value={value}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 min-w-0 bg-transparent text-center font-black text-slate-800 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-2"
          placeholder="0"
        />
        
        <button
          type="button"
          onClick={increment}
          className="p-2.5 shrink-0 rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:text-[#4DBA87] dark:hover:text-[#4DBA87] transition-all active:scale-90"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
