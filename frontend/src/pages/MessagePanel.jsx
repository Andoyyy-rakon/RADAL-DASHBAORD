import React, { useEffect, useState,} from 'react'
import {Mail, User,Expand,Box,ChevronDownIcon} from 'lucide-react';
import Messages from '../components/Messages';
import { UserContext } from '../usercontext/UserContext';
import { useContext } from 'react';
import { assets } from '../assets/asset';
import io from "socket.io-client";
import api from '../axios/AxiosApiFormat';
import OfflineMapTest from './OfflineMap';
import ChartStat from './ChartStat';




const MessagePanel = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const {reports,setreports} = useContext(UserContext)
    const [familyinfo,setfamilyinfo]=useState([])
    const [open, setOpen] = useState(false);
    const familyRef = React.useRef([]);


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

  const filteredReports = reports.filter(report => filters[report.status_str]);


useEffect(() => {
  familyRef.current = familyinfo;
}, [familyinfo]);

    
    
useEffect(() => {
  const getAllInfo = async () => {
    try {
      const res = await api.get('/users/getAllinfo');
      setfamilyinfo(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  getAllInfo();
}, []);


const getFriendlyStatus = (status_str) => {
  switch (status_str.toLowerCase()) {
    case 'alert':
      return {
        text: 'We are at risk! Need help ASAP',
        image: assets.Alert 
      };

    case 'aid':
      return {
        text: 'Need food and water',
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
      const res = await api.get('users/events');
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
      updated[index] = mergedReport;
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


  return () => {
      socket.disconnect();
    };

},[])



  return (
    <div className='flex-1 min-h-screen pl-7 bg-[#F5F7FB]'>
        <div className='pl-7 pr-10 pt-3'>
            <div className=' flex gap-2  items-center'>
                <Box size={28}/>
                <h1 className='text-3xl  font-semibold text-[#1F2937]'>Dashboard</h1>
            </div>
                <div className="flex items-end gap-4 mt-5">
                    <div className="bg-white p-4 w-[250px]  rounded-2xl shadow-lg relative ">
                        <div className="flex justify-between  items-center mb-2">
                            <span className="text-gray-600 font-medium ">New Messages</span>
                            <Mail size={20} className='text-gray-600 mr-4 '/>
                        </div>
                            <div className='absolute bg-gray-400 h-[1px]  w-[80%] '></div>
                            <p className="text-3xl font-bold text-gray-800 pt-1">{reports.length}</p>    
                      </div>

                      <ChartStat reports={reports} />

                        
                </div>

                <div className='h-full w-full bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100
 max-w-full bg-white min-h-[500px] flex flex-row stify-items-center pt-5 px-2   gap-y-10   mt-8 shadow-2xl'>
               
    <div className='w-1/2 px-3'>
      <div className="flex gap-4 mt-4 justify-between items-center w-[97%] px-3 border-b-2 mx-4 pb-2 border-gray-400 shadow-soft">
{/* <div className='flex gap-5'>
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={filters.ALERT}
      onChange={() => toggleFilter("ALERT")}
      className='accent-gray-500'
    />
    <span className="text-[#EF646A] font-semibold">Alert</span>
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={filters.AID}
      onChange={() => toggleFilter("AID")}
      className='accent-gray-500'
    />
    <span className="text-[#549EF2] font-semibold">Aid</span>
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={filters.SAFE}
      onChange={() => toggleFilter("SAFE")}
      className='accent-gray-500'
    />
    <span className="text-[#4DBA87] font-semibold">Safe</span>
  </label>
</div> */}

<div className="relative w-40 ">
     
      {/* <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-1 bg-[#FACC15] rounded-lg text-left shadow-sm"
      >
        Filter ▼
      </button> */}

      <button
        onClick={() => setOpen(!open)}
        className={`w-full px-3 py-1 border-2    ${open?"bg-white  border-[#FACC15]":"bg-[#FACC15] border-transparent "} rounded-lg text-left shadow-sm flex justify-between
        transition-all duration-300 ease-in-out items-center`}
      >
        <span className='font-medium '>Filter</span>
        {/* Arrow */}
        <ChevronDownIcon
          className={`w-5 h-5 text-black transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg p-2 z-10">
          
          <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={filters.ALERT}
              onChange={() => toggleFilter("ALERT")}
            />
            <span className="text-[#EF646A] font-semibold">Alert</span>
          </label>

          <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={filters.AID}
              onChange={() => toggleFilter("AID")}

            />
            <span className="text-[#549EF2] font-semibold">Aid</span>
          </label>

          <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={filters.SAFE}
              onChange={() => toggleFilter("SAFE")}
            />
            <span className="text-[#4DBA87] font-semibold">Safe</span>
          </label>

        </div>
      )}
    </div>

<div>
 <Expand size={18} className='text-gray-600'/>

</div>
  
</div>
                  <div className='flex flex-col w-full pr-5'>
                      {filteredReports.map(data=>(
                        <div key={data._id}>
                            <Messages {...data}
                            onSelect={()=>setSelectedReport(data)}
                            isActive={selectedReport?._id===data._id}
                            />
                        </div>
                        
                    ))}
                  </div>
                </div>
                  
                  <div className='w-1/2 h-[50%]  flex-1 px-3  py-3 shadow-floating rounded-lg '>
                    <OfflineMapTest selectedReport={selectedReport} />
                  </div>

                </div>
                
        </div>



    </div>
  )
}

export default MessagePanel