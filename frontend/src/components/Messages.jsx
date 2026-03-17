
// import {MessageSquareText,MapPinned,PcCase,Send,Copy} from 'lucide-react'
// import { formatDate,timeAgo } from '../components/formula';
// import { assets } from '../assets/asset';
// import { useEffect, useState } from 'react';


// const messages = ({device_id,family_info,warning_message,lon,lat,location,time,quantity,status_str,display_time,time_label,onSelect,isActive}) => {

//   const[copy,setcopy]=useState(false)


//   useEffect(()=>{
//     onSelect()

//   },[lon,lat])

//   const borderRing={
//     ALERT:"border-red-500",
//     AID:"border-blue-500",
//     SAFE:"border-green-500"
//   }
//   const messageColor={
//     ALERT:"text-red-500",
//     AID:"text-blue-500",
//     SAFE:"text-green-500",
//   }

//     const borderColor={
//     ALERT:"border-red-500",
//     AID:"border-blue-500",
//     SAFE:"border-green-500",
//   }

//   const bgColor={
//     ALERT:"bg-red-50",
//     AID:"bg-blue-50",
//     SAFE:"bg-green-50",
//   }


//   const allertColor={
//     ALERT:"bg-red-500",
//     AID:"bg-blue-500",
//     SAFE:"bg-green-500",
//   }
//   const colorMap = {
//   ALERT: "rgba(255,0,0,0.3)",
//   AID: "rgba(0,0,255,0.3)",
//   SAFE: "rgba(0,255,0,0.3)",
// };


// const imageAnimation = {
//   SAFE: "animate-float drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]", 
//   AID: "animate-float drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]", 
//   ALERT: "animate-shake drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]", 
// };




//   return (
//         <div className={`hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer flex gap-3 items-center  m-5 pt-2 pb-5 px-1 justify-center rounded-xl shadow-lg ${isActive?'ring-2 ring-orange-500 bg-orange-50' : 'bg-gray-100'}`} onClick={onSelect}>
//             <div className='max-w-md  space-y-3 relative' >
//               <div className='flex items-center justify-between'>
//                 <div className='flex gap-2 items-center'>
//                     <PcCase className='text-orange-700' size={17}/>
//                     <h3 className='font-bold text-sm '>Id:{device_id}</h3>   
//                 </div>
//                 <div className='relative inline-block group cursor-pointer'>
        
//                     <p className="text-xs text-gray-500">
//                       <span className={
//                         time_label === 'Alert received'
//                           ? 'text-red-600 font-medium'
//                           : 'text-green-600 font-medium'
//                       }>
//                                   {time_label}
                                
//                     </span>
//                     {' • '}
//                     <span>
//                       {timeAgo(display_time)}
//                     </span>
//                     <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
//                                   opacity-0 group-hover:opacity-100
//                                   transition-opacity duration-300
//                                   bg-gray-800 text-white text-sm px-2 py-1 rounded
//                                   pointer-events-none
//                                   whitespace-nowrap">
//                     {formatDate(display_time)}
//                   </span>
//                   </p>
//                 </div>

//               </div>
                
//                 <div className='flex gap-2   '>

//     <div className={` shadow-lg ${borderRing[status_str]} border-2  bg-white p-2 
//     rounded-lg min-w-[450px] min-h-[200px] space-y-2
//     transition-all duration-300 ease-in-out
//     `}>
//                       <div className='flex justify-end'>
                           
//       <div className="relative w-6 h-6 flex justify-center items-center">
    
//         {[0, 0.3, 0.6].map((delay, i) => (
//             <span
//               key={i}
//               className="absolute rounded-full"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 backgroundColor:`${colorMap[status_str]}`, 
//                 transform: "scale(1)",
//                 animation: `redWavePulse 2s ${delay}s infinite ease-in-out`,
//               }}
//             ></span>
//         ))}
      
//         <span className={`relative w-3 h-3 ${allertColor[status_str]} rounded-full`}></span>
//       </div>

//       <style>
//         {`
//           @keyframes redWavePulse {
//             0% {
//               transform: scale(1);
//               opacity: 0.6;
//             }
//             50% {
//               transform: scale(2.2);
//               opacity: 0;
//             }
//             100% {
//               transform: scale(1);
//               opacity: 0.6;
//             }
//           }
//         `}
//       </style>

//                         </div>
//                         <div className='flex justify-center items-center max-h-none flex-col'>
//                           <div className='w-[150px] min-h-[150px] absolute top-0'>
//                               <img className={`w-full transition-all duration-300 ${imageAnimation[status_str]}`}  src={warning_message.image} alt="" />

//                           </div>
//                           <h1
//                           className={`${messageColor[status_str]} text-lg font-bold text-center `}
//                           >
//                           {warning_message.text}
//                     </h1>

//                         </div>
                        
                      
//                      <h1 className='font-medium text-sm'><span className='font-bold text-md'>{family_info} </span>family, <span className='text-orange-500 text-md font-bold'>{quantity}</span> members</h1>

//                         <h1 className='text-sm'><span className='text-orange-600 font-bold'>Location Description:</span> {location}</h1>

//         <div className='flex gap-2 pt-3 justify-end  '> 
//                 <MapPinned className='text-orange-700' size={22}/>
// <p className="text-sm font-semibold mt-1 flex items-center gap-2 ">
//   Coordinates:
//   <span className="select-all">
//     {lat},{lon}
//   </span>
// <Copy className='w-4 text-gray-800 shadow-2xl hover:scale-110 cursor-pointer duration-300 transition-all' onClick={(e) =>
// { e.stopPropagation()
//   navigator.clipboard.writeText(`${lat},${lon}`)

//   setcopy(true)
//   setTimeout(()=>{
//     setcopy(false)
//   },2000)
// }}
// ></Copy>
// {copy&&<span className='absolute right-0 bottom-10 transition-all duration-300  bg-black text-white rounded-md px-2 py-1'>Copied</span>
// }
// </p>
//                 </div>

//                     </div>
                    

//                 </div>
                

//             </div>
//             {/* <div className='flex items-center gap-4'>
                

//                 <button className='bg-yellow-500 px-4 py-2 flex hover:scale-105 hover:bg-orange-600 transition-all duration-300 active:bg-yellow-500 text-white rounded-md font-semibold items-center'>Ack <Send size={20}/>  </button>

//             </div> */}
//         </div>

//   )
// }

// export default messages






import { MapPinned, PcCase, Copy } from "lucide-react";
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

  const imageAnimation = {
    SAFE: "animate-float drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]",
    AID: "animate-float drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]",
    ALERT: "animate-shake drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]",
  };

  return (
    <div
      onClick={onSelect}
      className={` w-full relative cursor-pointer m-5 p-5 rounded-xl bg-white shadow-floating transition-all duration-300 
      hover:scale-105 hover:shadow-xl border-l-4  ${borderColor[status_str]}
      ${isActive ? "ring-2  ring-gray-900 scale-[1.02] border-none" : ""}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2 items-center">
          <PcCase className={`${messageColor[status_str]}`} size={18} />
          <h3 className="font-bold text-sm">Id: {device_id}</h3>
        </div>

        <div className="group">
          <p className="text-xs text-gray-500">
            <span
              className={
                time_label === "Alert received"
                  ? "text-red-600 font-medium"
                  : "text-green-600 font-medium"
              }
            >
              {time_label}
            </span>{" "}
            • {timeAgo(display_time)}
          </p>

          <span
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          opacity-0 group-hover:opacity-100 transition
          bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
          >
            {formatDate(display_time)}
          </span>
        </div>
      </div>

      {/* Status Dot */}
      <div className="flex justify-end mb-2">
        <div className="relative w-6 h-6 flex items-center justify-center">
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
          <span
            className={` w-3 h-3 ${dotColor[status_str]} rounded-full`}
          ></span>
        </div>
      </div>

      {/* Image + Message */}
        <div className="flex items-center text-center absolute left-[-30px] top-6">
        <img
          src={warning_message.image}
          className={`w-[120px]`}
        />
        <div className="absolute ml-[81px] text-start ">
        <h1 className="whitespace-nowrap text-md font-bold text-[#1F2937]">
          {family_info}<span className="inline"> Family</span>
        </h1>

        <p className="whitespace-nowrap text-xs font-semibold text-[#9CA3AF]">{quantity}<span>{Number(quantity)>1?" Members":" Member"}</span></p>

        </div>
        
      </div>

      
        
      

      {/* Family Info */}
      {/* <p className="text-sm mt-3">
        <span className="font-bold">{family_info}</span> family,{" "}
        <span className="text-orange-500 font-bold">{quantity}</span> members
      </p> */}

 
      

      {/* Location */}
      <p className="text-sm py-3 whitespace-normal break-words text-[#1F2937]">
        <span className={`font-bold ${messageColor[status_str]}`}>
          Location Description:
        </span>{" "}
        {location}
      </p>

      {/* Coordinates */}
      <div className="flex gap-2 items-center  ">
        <MapPinned className={`${messageColor[status_str]}`} size={20} />

        <p className="text-sm font-semibold flex items-center gap-2 text-[#1F2937]">
          Coordinates:
          <span className="select-all">
            {lat},{lon}
          </span>

          <Copy
            className="w-4 text-gray-700 cursor-pointer hover:scale-110 transition"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(`${lat},${lon}`);
              setCopy(true);

              setTimeout(() => setCopy(false), 2000);
            }}
          />

          {copy && (
            <span className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded">
              Copied
            </span>
          )}
        </p>
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