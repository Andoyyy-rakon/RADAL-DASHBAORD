import { MapPinned, Copy, AlertTriangle, HelpCircle, ShieldCheck, Trash2 } from "lucide-react";
import { formatDate, timeAgo } from "../components/formula";
import { useEffect, useState } from "react";

const Messages = ({
  device_id,
  family_info,
  warning_message,
  lon,
  lat,
  location,
  quantity,
  status_str,
  display_time,
  time_label,
  onSelect,
  isActive,
  response_code,
  response_bool,
  onRespond,
  onDelete
}) => {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    onSelect();
  }, [lon, lat]);

  const borderColor = {
    ALERT: "border-[#EF646A]",
    AID: " border-[#549EF2]",
    SAFE: "border-[#4DBA87]",
  };

  const messageColor = {
    ALERT: "text-[#EF646A]",
    AID: "text-[#549EF2]",
    SAFE: "text-[#4DBA87]",
  };

  const dotColor = {
    ALERT: "bg-red-500",
    AID: "bg-blue-500",
    SAFE: "bg-green-500",
  };

  const pulseColor = {
    ALERT: "rgba(239,68,68,0.4)",
    AID: "rgba(59,130,246,0.4)",
    SAFE: "rgba(34,197,94,0.4)",
  };

  const statusIcon = {
    ALERT: <AlertTriangle className="text-[#EF646A]" size={18} />,
    AID: <HelpCircle className="text-[#549EF2]" size={18} />,
    SAFE: <ShieldCheck className="text-[#4DBA87]" size={18} />,
  };

  const imageAnimation = {
    SAFE: "animate-float drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]",
    AID: "animate-float drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]",
    ALERT: "animate-shake drop-shadow-[0_0_25px_rgba(239,68,68,0.7)]",
  };

  // Purpose: This component renders the UI card for a single alert.
  // - onRespond: Callback to trigger the ConfirmModal in the parent component before changing status.
  // - onDelete: Callback to trigger the Delete ConfirmModal in the parent component.
  // - response_code/response_bool: Dictates the highlighted styling for whichever action was selected.
  
  return (
    <div
      onClick={onSelect}
      className={` w-full relative cursor-pointer mb-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-all duration-300 
      hover:scale-[1.01] hover:shadow-lg border-l-4 ${borderColor[status_str]}
      ${isActive ? "ring-2 ring-slate-900 dark:ring-[#FACC15] border-transparent" : ""}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          {statusIcon[status_str]}
          <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">Id: {device_id}</h3>
        </div>

        <div className="flex items-center gap-2">
          {onDelete && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-red-400 hover:text-red-500 transition-colors p-1"
              title="Delete Alert"
            >
              <Trash2 size={16} />
            </button>
          )}
          <div className="group relative">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              <span
                className={
                  time_label === "Alert received"
                    ? "text-[#EF646A] font-medium"
                    : "text-[#4DBA87] font-medium"
                }
              >
                {time_label}
              </span>{" "}
              • {timeAgo(display_time)}
            </p>

            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
            opacity-0 group-hover:opacity-100 transition
            bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none"
            >
              {formatDate(display_time)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-4">
        <div className="relative flex-shrink-0">
          <img
            src={warning_message.image}
            className={`w-[70px] sm:w-[90px] h-auto ${imageAnimation[status_str]} mix-blend-multiply dark:mix-blend-normal`}
            alt="status"
          />

          {/* Pulse Dot Integrated */}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1.5">
            <span className="text-[15px] font-black py-0.5 px-2.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg shadow-sm uppercase tracking-wider border border-slate-200/50 dark:border-slate-600/50">
              {family_info} Family
            </span>
            <span className={`text-[11px] font-black uppercase tracking-widest ${messageColor[status_str]}`}>
              {warning_message.text}
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center justify-center sm:justify-start gap-1">
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            {quantity} <span>{Number(quantity) > 1 ? "Members" : "Member"}</span>
          </p>
        </div>

        <div className="absolute top-13 right-7  w-5 h-5 flex items-center justify-center">
            {[0, 0.3, 0.6].map((delay, i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: pulseColor[status_str],
                  animation: `pulseWave 2s ${delay}s infinite`,
                }}
              ></span>
            ))}
            <span className={`w-2 h-2 ${dotColor[status_str]} rounded-full shadow-sm`}></span>
          </div>
      </div>

      {/* Location */}
      <div className="mb-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
        <p className="text-[13px] text-[#4B5563] dark:text-gray-300 leading-relaxed overflow-hidden text-ellipsis">
          <span className={`font-bold ${messageColor[status_str]} mr-2 uppercase text-[11px] tracking-wider`}>
            Location:
          </span>{" "}
          {location}
        </p>
      </div>

      {/* Coordinates */}
      <div className="flex flex-wrap gap-3 items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
        <div className="flex gap-2 items-center">
          <MapPinned className={`${messageColor[status_str]}`} size={16} />
          <p className="text-[11px] font-mono font-semibold text-gray-600 dark:text-gray-400">
            {lat}, {lon}
          </p>
          <div className="relative group/copy">
            <Copy
              className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-[#FACC15] transition"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(`${lat},${lon}`);
                setCopy(true);
                setTimeout(() => setCopy(false), 2000);
              }}
            />
            {copy && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg z-50">
                Copied!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Response Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button 
          onClick={(e) => { e.stopPropagation(); onRespond && onRespond(1, true); }}
          className={`flex-1 min-w-[100px] text-[11px] font-bold py-2 px-2 rounded-lg transition-all ${response_code === 1 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}`}
        >
          Acknowledged
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onRespond && onRespond(2, true); }}
          className={`flex-1 min-w-[100px] text-[11px] font-bold py-2 px-2 rounded-lg transition-all ${response_code === 2 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'}`}
        >
          Help En Route
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onRespond && onRespond(3, true); }}
          className={`flex-1 min-w-[100px] text-[11px] font-bold py-2 px-2 rounded-lg transition-all ${response_code === 3 ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-900/30'}`}
        >
          Standby
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onRespond && onRespond(4, true); }}
          className={`flex-1 min-w-[100px] text-[11px] font-bold py-2 px-2 rounded-lg transition-all ${response_code === 4 ? 'bg-red-500 text-white shadow-md shadow-red-500/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-900/30'}`}
        >
          Unable to Respond
        </button>
      </div>

      <style>
        {`
        @keyframes pulseWave{
          0%{transform:scale(1);opacity:0.6}
          50%{transform:scale(2.2);opacity:0}
          100%{transform:scale(1);opacity:0.6}
        }
        `}
      </style>
    </div>
  );
};

export default Messages;