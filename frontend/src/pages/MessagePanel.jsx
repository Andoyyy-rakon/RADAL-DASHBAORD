import React, { useEffect, useState,} from 'react'
import {Mail, User, Expand, Box, ChevronDownIcon, Globe, X} from 'lucide-react';
import Messages from '../components/Messages';
import { UserContext } from '../usercontext/UserContext';
import { useContext } from 'react';
import { assets } from '../assets/asset';
import io from "socket.io-client";
import OfflineMapTest from './OfflineMap';
import ChartStat from './ChartStat';
import apiaxio from '../axios/AxiosApiFormat';
import axiosPrivate from '../api/axiosPrivate';
import ConfirmModal from '../components/ConfirmModal';




const MessagePanel = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const {reports,setreports} = useContext(UserContext)
    const [familyinfo,setfamilyinfo]=useState([])
    const [open, setOpen] = useState(false);
    const [showMap, setShowMap] = useState(true);
    const [selectedMap, setSelectedMap] = useState("Alijis");
    const familyRef = React.useRef([]);
    // State to manage the response confirmation modal payload
    const [confirmModalData, setConfirmModalData] = useState({ isOpen: false, report: null, responseCode: null, responseBool: false });

    const statusLegend = [
        { label: 'Safe', icon: assets.safe, color: 'text-[#4DBA87]', desc: 'User reports they are in a secure location.' },
        { label: 'Aid', icon: assets.supplies, color: 'text-[#549EF2]', desc: 'User needs essential supplies such as food, water, or first aid.' },
        { label: 'Alert', icon: assets.Alert, color: 'text-[#EF646A]', desc: 'Emergency! Immediate rescue required.' },
    ];


    const [filters, setFilters] = useState({
      ALERT: true,
      AID: true,
      SAFE: true
    });

  const toggleFilter = (type) => {
  setFilters(prev => ({
    ...prev,
    [type]: !prev[type]
  }));
  };

  // Purpose: Only display reports where response_bool is false (It means they haven't been responded to yet).
  // The filter object toggles (ALERT, AID, SAFE) are also respected.
  const filteredReports = reports.filter(report => filters[report.status_str] && !report.response_bool);


useEffect(() => {
  familyRef.current = familyinfo;
}, [familyinfo]);

    
    
useEffect(() => {
  const getAllInfo = async () => {
    try {
      const res = await axiosPrivate.get('/users/getAllinfo');
      setfamilyinfo(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  getAllInfo();
}, []);


const handleResponse = (report, responseCode, responseBool) => {
  // Purpose: Instead of immediately sending the DB update, intercept the click and open a confirmation modal.
  setConfirmModalData({ isOpen: true, report, responseCode, responseBool });
};

// const executeResponse = async () => {
//   const { report, responseCode, responseBool } = confirmModalData;
//   if (!report) return;

//   try {
//     // Purpose: Compile the updated event object by merging the existing event properties with the new response tags.
//     const updatedEventObj = {
//       ...report,
//       response_code: responseCode,
//       response_bool: responseBool
//     };
    
//     // Purpose: Send the POST request to the backend. The backend uses `findOneAndUpdate` to upsert this payload.
//     // Setting `response_bool` to true acts as the flag that moves it to the Acknowledge page.
//     const res = await apiaxio.post('/users/events', updatedEventObj);
//     if(res.data.success) {
//       // Purpose: Optimistically update the local state array. Since `response_bool` is now true, `filteredReports` will automatically hide it.
//       setreports(prev => prev.map(r => r.handheld_id === report.handheld_id ? { ...r, ...res.data.event, response_code: responseCode, response_bool: responseBool } : r));
//     }
//   } catch (error) {
//     console.error("Error updating response", error);
//   } finally {
//     setConfirmModalData({ isOpen: false, report: null, responseCode: null, responseBool: false });
//   }
// };


const executeResponse = async () => {
  const { report, responseCode, responseBool } = confirmModalData;
  if (!report) return;

  try {

    // 1️⃣ SEND TO ESP32
    await apiaxio.post('/send-response', {
      handheld_id: report.handheld_id,
      msg_id: report.msg_id,
      response_code: responseCode
    });

    // 2️⃣ UPDATE DATABASE
    const updatedEventObj = {
      ...report,
      response_code: responseCode,
      response_bool: responseBool
    };

    const res = await apiaxio.post('/users/events', updatedEventObj);

    if(res.data.success) {
      setreports(prev =>
        prev.map(r =>
          r.handheld_id === report.handheld_id
            ? { ...r, ...res.data.event, response_code: responseCode, response_bool: responseBool }
            : r
        )
      );
    }

  } catch (error) {
    console.error("Error sending response", error);
  } finally {
    setConfirmModalData({
      isOpen: false,
      report: null,
      responseCode: null,
      responseBool: false
    });
  }
};



const getFriendlyStatus = (status_str) => {
  switch (status_str.toLowerCase()) {
    case 'alert':
      return {
        text: 'Alert',
        image: assets.Alert 
      };

    case 'aid':
      return {
        text: 'Requesting Aid',
        image: assets.supplies
      };

    case 'safe':
      return {
        text: 'Safe',
        image: assets.safe 
      };

    default:
      return {
        text: status_str,
        image: null
      };
  }
};


useEffect(() => {
  if (!familyinfo.length) return; 

  const fetchAllert = async () => {
    try {
      const res = await apiaxio.get('/users/events');
      const merged = res.data.data.map(event => {
        const familydata = familyinfo.find(f => f.device_id == event.handheld_id);
        return {
          ...event,
          device_id:familydata?.device_id||0,
          family_info: familydata?.family_name || 'Unknown',
          quantity: familydata?.quantity || 0,
          location: familydata?.location || '',
          warning_message: getFriendlyStatus(event.status_str),
          display_time: event.updatedAt || event.createdAt,
          time_label: 'Alert received'
        };
      });


      setreports(merged);

    } catch (error) {
      console.log(error);
    }
  };

  fetchAllert();
}, [familyinfo]);

console.log(reports)


useEffect(()=>{

  const socket = io("http://localhost:3000");

  socket.on("event_update", (event) => {
  const fam = familyRef.current.find(
    f => f.device_id === event.handheld_id
  );

  const mergedReport = {
    ...event,
    device_id: fam?.device_id || event.handheld_id,
    family_info: fam?.family_name || 'Unknown',
    quantity: fam?.quantity || 0,
    location: fam?.location || '',
    warning_message: getFriendlyStatus(event.status_str),
    time_label: 'Status updated',
    display_time: event.updatedAt
  };

  console.log(mergedReport)

  setreports(prev => {
    const index = prev.findIndex(
      r => r.handheld_id === mergedReport.handheld_id
    );

    if (index !== -1) {
      const updated = [...prev];
      const oldReport = prev[index];

      // Purpose: Only update the time if the physical device status actually changed.
      const statusChanged = oldReport.status !== event.status;
      
      updated[index] = {
        ...mergedReport,
        time_label: statusChanged ? 'Status updated' : oldReport.time_label,
        display_time: statusChanged ? event.updatedAt : oldReport.display_time
      };
      return updated;
    }


    return [
      {
        ...mergedReport,
        time_label: 'Alert received',
        display_time: event.createdAt
      },
      ...prev
    ];
  });
});

  socket.on("alert_deleted", (data) => {
    setreports(prev => prev.filter(r => r._id !== data._id));
  });

  return () => {
      socket.disconnect();
    };

},[])



  return (
    <div className='flex-1 min-h-screen bg-[#F5F7FB] dark:bg-slate-900 transition-colors duration-300'>
        <div className='p-4 sm:p-6 lg:p-8'>
            <div className='flex gap-2 items-center mb-1'>
                <Box size={28} className="dark:text-[#FACC15]"/>
                <h1 className='text-3xl font-semibold text-[#1F2937] dark:text-white'>Dashboard</h1>
            </div>
                
                <div className="flex flex-col xl:flex-row items-start xl:items-end gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-5 min-w-[240px] rounded-2xl shadow-lg relative border border-slate-100 dark:border-slate-700 transition-all">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">All Reports</span>
                            <Mail size={20} className='text-gray-400 dark:text-[#FACC15]'/>
                        </div>
                        <div className='absolute bg-slate-100 dark:bg-slate-700 h-[1px] w-[80%] top-[50%] left-5'></div>
                        <p className="text-4xl font-bold text-slate-800 dark:text-white mt-1">{reports.length}</p>    
                    </div>
                    <div className="flex-1 w-full overflow-hidden">
                        <ChartStat reports={reports} />
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-6 mt-8'>
                    {/* Messages List Column */}
                    <div className={`${showMap ? 'lg:max-w-[50%]' : 'lg:max-w-full'} flex-1 bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl p-4 min-h-[450px] flex flex-col transition-all duration-500`}>
                        <div className="flex justify-between items-center px-2 mb-4 border-b border-slate-100 dark:border-slate-700 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="relative w-40">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className={`w-full px-5 py-2.5 border-2 ${open ? "bg-white dark:bg-slate-700 border-[#FACC15] ring-4 ring-yellow-500/10" : "bg-[#FACC15] border-transparent hover:bg-yellow-500"} rounded-xl text-left shadow-lg shadow-yellow-500/10 flex justify-between transition-all duration-300 ease-in-out items-center group`}
                                    >
                                        <span className={`font-bold ${open ? 'text-slate-800 dark:text-white' : 'text-slate-900'}`}>Filter Status</span>
                                        <ChevronDownIcon
                                            className={`w-5 h-5 ${open ? 'text-[#FACC15]' : 'text-slate-900'} transform transition-transform duration-500 ${open ? "rotate-180" : "rotate-0"}`}
                                        />
                                    </button>

                                    {open && (
                                        <div className="absolute mt-3 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-2xl p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                                            <label className="flex items-center gap-3 p-3.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl cursor-pointer transition-all group/item">
                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filters.ALERT ? 'bg-[#EF646A] border-[#EF646A]' : 'border-slate-300 dark:border-slate-600'}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.ALERT}
                                                        onChange={() => toggleFilter("ALERT")}
                                                        className="hidden"
                                                    />
                                                    {filters.ALERT && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                </div>
                                                <span className="text-[#EF646A] font-black text-sm uppercase tracking-wider">Alerts</span>
                                            </label>
                                            
                                            <label className="flex items-center gap-3 p-3.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl cursor-pointer transition-all group/item">
                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filters.AID ? 'bg-[#549EF2] border-[#549EF2]' : 'border-slate-300 dark:border-slate-600'}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.AID}
                                                        onChange={() => toggleFilter("AID")}
                                                        className="hidden"
                                                    />
                                                    {filters.AID && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                </div>
                                                <span className="text-[#549EF2] font-black text-sm uppercase tracking-wider">Aids</span>
                                            </label>

                                            <label className="flex items-center gap-3 p-3.5 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl cursor-pointer transition-all group/item">
                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filters.SAFE ? 'bg-[#4DBA87] border-[#4DBA87]' : 'border-slate-300 dark:border-slate-600'}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.SAFE}
                                                        onChange={() => toggleFilter("SAFE")}
                                                        className="hidden"
                                                    />
                                                    {filters.SAFE && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                </div>
                                                <span className="text-[#4DBA87] font-black text-sm uppercase tracking-wider">Safe</span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                                {!showMap && (
                                    <button 
                                        onClick={() => setShowMap(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-[#FACC15] dark:hover:bg-[#FACC15] text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-xl transition-all font-bold text-sm"
                                    >
                                        <Globe size={16} />
                                        Show Map
                                    </button>
                                )}
                            </div>
                            <div className='font-black p-1  bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg shadow-sm tracking-wider border border-slate-200/50 dark:border-slate-600/50'>
                             <div className="flex justify-between gap-2 items-center">
                                  <div className="text-gray-500 dark:text-gray-400 font-medium text-xs">Unresponded Reports</div>
                                  <div className="ml-auto bg-red-500 text-white text-[10px] item-center font-black px-2 py-0.5 rounded-full">
                                      {reports.filter(r => !r.response_bool).length}
                                    </div>
                                </div> 
                            </div>
                            
                        </div>

                        {/* Scroll container */}
                        <div className={`flex-1 overflow-y-auto pt-3 pb-2 px-2 space-y-4 ${showMap ? 'max-h-[550px]' : 'max-h-[800px]'} custom-scrollbar scroll-smooth`}>
                            {filteredReports.map(data => (
                                <div key={data._id}>
                                    <Messages {...data}
                                        onSelect={() => setSelectedReport(data)}
                                        isActive={selectedReport?._id === data._id}
                                        onRespond={(code, bool) => handleResponse(data, code, bool)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                
                    {/* Map Column */}
                    {showMap && (
                        <div className='flex-1 bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl p-4 flex flex-col transition-all duration-500 animate-in slide-in-from-right-10'>
                            <div className="flex justify-between items-center mb-4 px-2">
                                <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                                    <Globe size={18} className="text-[#FACC15]"/>
                                     Map
                                </h3>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={selectedMap}
                                        onChange={(e) => setSelectedMap(e.target.value)}
                                        className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="Alijis">Alijis, Bacolod</option>
                                        <option value="Sipalay">Barangay 3, Sipalay</option>
                                    </select>
                                    <button 
                                        onClick={() => setShowMap(false)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-500 transition-all"
                                        title="Hide Map"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="h-[280px] rounded-xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-700">
                                <OfflineMapTest selectedReport={selectedReport} selectedMap={selectedMap} />
                            </div>

                            {/* Map Legend */}
                            <div className="mt-6 border-t border-slate-100 dark:border-slate-700 pt-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 ml-1">
                                    Status Indicators
                                </h4>
                                <div className="grid grid-cols-1 gap-4">
                                    {statusLegend.map((item) => (
                                        <div key={item.label} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-50 dark:border-slate-800 transition-all hover:border-[#FACC15]/30 group">
                                            <div className="w-14 h-14 flex items-center justify-center">
                                                  <img
                                                    src={item.icon}
                                                    alt={item.label}
                                                    className="w-10 h-10 object-contain mx-auto"
                                                  />
                                                </div>
                                            <div>
                                                <p className={`text-sm font-black ${item.color}`}>{item.label}</p>
                                                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-tight">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal 
              isOpen={confirmModalData.isOpen}
              onClose={() => setConfirmModalData({ isOpen: false, report: null, responseCode: null, responseBool: false })}
              onConfirm={executeResponse}
              title="Send Response"
              message="Are you sure you want to send this response out? This alert will be moved to the Acknowledged tab."
              confirmText="Send Response"
            />
        </div>
    );
};


export default MessagePanel