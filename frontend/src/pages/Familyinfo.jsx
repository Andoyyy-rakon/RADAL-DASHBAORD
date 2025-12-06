import React from 'react'
import { Menu, X, Home, BarChart3, FileText, MessageSquare,Trash,Pencil, Globe, LogOut, ChevronRight, Bell, Settings,User,icons,UsersRound,PcCase,UserRoundPen,CircleUserRound} from 'lucide-react';
import { useState } from 'react';


const Familyinfo = ({device_id,family_name,quantity,location}) => {

    const [toolBar,setToolbar] = useState(false);
    const [toolTitle,setToolTitle] = useState(false)



  return (
            <>
                
                {toolBar&&
                <div className='absolute top-0 right-10 bg-white shadow-xl px-3 py-2 rounded-xl flex gap-2 transition-all duration-300'>
                    <div className="flex items-center space-x-2">


                    <div className="group  flex items-center">
                        <Pencil 
                        className="text-orange-500 transition-all duration-300 hover:scale-150 cursor-pointer" 
                        size={20}
                        />

                        <span className="
                        absolute top-[-20px]
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity 
                        duration-300
                        text-sm font-semibold
                        ">
                        Edit
                        </span>
                    </div>


                    <div className="group  flex items-center">
                        <Trash 
                        className="text-orange-500 transition-all duration-300 hover:scale-150 cursor-pointer" 
                        size={20}

                        />

                        <span className="
                        absolute top-[-20px] right-1
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity 
                        duration-300
                        text-sm font-semibold
                        ">
                        Delete
                        </span>
                    </div>
                    </div>

                    
                </div>}
              <div key={device_id} className='bg-white relative   border-2 border-transparent shadow-xl p-8 rounded-2xl  hover:border-2 hover:border-orange-500 transition-all duration-300 cursor-pointer' onClick={()=>setToolbar(prev=>!prev)}>
                <div className='flex justify-end text-orange-500 absolute top-3 right-5'>
                    <User/>
                </div>
                <div className='space-y-1'>
                  <p className='flex'><span className='mr-1 text-orange-500'><PcCase/></span><span className='font-medium mr-1'>Device Id:</span>{device_id}</p>
                  <p className='ml-7'><span className='font-medium'>Family name:</span> {family_name}</p>
                  <p className='ml-7' ><span className='font-medium'>Members:</span> {quantity}</p>
                  <p className='ml-7'><span className='font-medium'>location:</span> {location}</p>
                </div>
              </div>
              </>
     
  )
}

export default Familyinfo