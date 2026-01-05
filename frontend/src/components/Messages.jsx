
import {MessageSquareText,MapPinned,PcCase,Send} from 'lucide-react'
const messages = ({device_id,family_info,warning_message,lon,lat,location,time,quantity,status_str}) => {

  const messageColor={
    ALERT:"text-red-500",
    AID:"text-blue-500",
    SAFE:"text-green-500",
  }

    const borderColor={
    ALERT:"border-red-500",
    AID:"border-blue-500",
    SAFE:"border-green-500",
  }

  const bgColor={
    ALERT:"bg-red-50",
    AID:"bg-blue-50",
    SAFE:"bg-green-50",
  }


  const allertColor={
    ALERT:"bg-red-500",
    AID:"bg-blue-500",
    SAFE:"bg-green-500",
  }
  const colorMap = {
  ALERT: "rgba(255,0,0,0.3)",
  AID: "rgba(0,0,255,0.3)",
  SAFE: "rgba(0,255,0,0.3)",
};



  return (
        <div className='flex gap-3 p-5 items-center'>
            <div className='max-w-md border-b-2 border-b-gray-800 p-2 space-y-3'>
                <div className='flex gap-2 items-center'>
                    <PcCase className='text-orange-700' size={17}/>
                    <h3 className='font-bold text-sm'>Id:{device_id}</h3>
                </div>
                <div className='flex gap-2 '>
                    <MessageSquareText className='text-orange-700 '/>
                    <div className={`${bgColor[status_str]} border-2 ${borderColor[status_str]} p-2 rounded-lg min-w-[400px] min-h-[1] space-y-3`}>
                        <div className='flex justify-between'>
                            <h1 className='font-medium text-sm'><span className='font-bold text-lg'>{family_info} </span>family, <span className='text-orange-500 text-lg font-bold'>{quantity}</span> members</h1>

           
      <div className="relative w-6 h-6 flex justify-center items-center">
    
        {[0, 0.3, 0.6].map((delay, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor:`${colorMap[status_str]}`, 
                transform: "scale(1)",
                animation: `redWavePulse 2s ${delay}s infinite ease-in-out`,
              }}
            ></span>
        ))}
      
        <span className={`relative w-3 h-3 ${allertColor[status_str]} rounded-full`}></span>
      </div>

      <style>
        {`
          @keyframes redWavePulse {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(2.2);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 0.6;
            }
          }
        `}
      </style>

                        </div>
                        
           
                    <h1
                    className={`${messageColor[status_str]} text-2xl font-bold`}
                    >
                    {warning_message}
                    </h1>
                        <h1 className='text-sm'><span className='text-orange-600 font-bold'>Location Description:</span> {location}</h1>
                    </div>

                </div>
                
                <div className='flex gap-2 pt-3 justify-end'> 
                <MapPinned className='text-orange-700' size={22}/>
                <p className='text-sm font-semibold mt-1'>Coordinates: {lon} x {lat}</p>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                

                <button className='bg-yellow-500 px-4 py-2 flex hover:scale-105 hover:bg-orange-600 transition-all duration-300 active:bg-yellow-500 text-white rounded-md font-semibold items-center'>Ack <Send size={20}/>  </button>

            </div>
        </div>

  )
}

export default messages