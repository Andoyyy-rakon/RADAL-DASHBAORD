import React from 'react'
import {Mail, User} from 'lucide-react';
import Messages from '../components/messages';
import { UserContext } from '../usercontext/UserContext';
import { useContext } from 'react';
import { assets } from '../assets/asset';


const MessagePanel = () => {

  const {reports,setReports} = useContext(UserContext);
  

  return (
    <div className='flex-1 min-h-screen pl-7 bg-orange-50'>
        <div className='pl-7 pr-10 pt-3'>
            <h1 className='text-3xl font-bold text-orange-700'>Dashboard</h1>
                <div className="flex  gap-4 mt-5">
                    <div className="bg-white p-4 w-[250px]  rounded-2xl shadow-lg relative">
                        <div className="flex justify-between  items-center mb-2">
                            <span className="text-gray-600 font-medium">New Messages</span>
                            <Mail size={20} className='text-gray-600 mr-4 '/>
                        </div>
                            <div className='absolute bg-gray-400 h-[1px]  w-[80%] '></div>
                            <p className="text-3xl font-bold text-gray-800 pt-1">{reports.length}</p>    
                        </div>

                        <div className="bg-white p-4 w-[250px]   rounded-2xl shadow-lg relative">
                            <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600 font-medium">Acknowledge Messages</span>
                            <Mail size={20} className='text-gray-600 mr-4'/>
                            </div>
                                <div className='absolute bg-gray-400 h-[1px]  w-[80%] '></div>
                                <p className="text-3xl font-bold text-gray-800 pt-1">21</p>
                        </div>

                        <div className='bg-white overflow-hidden p-1 w-[200px] rounded-2xl shadow-xl relative left-[400px] cursor-pointer hover:scale-110 transition-all duration-300'>
                                <img src={assets.mapExample} alt="Map" className='w-full h-full object-cover rounded-2xl'/>
                        </div>

                        
                </div>

                <div className='max-w-full bg-white min-h-[500px] grid items-center justify-items-center pt-5  grid-cols-2 gap-y-10 rounded-xl mt-8 shadow-2xl'>
                    {reports.map(data=>(
                        <div key={data.id}>
                            <Messages {...data}/>
                        </div>
                        
                    ))}
                </div>
                
        </div>



    </div>
  )
}

export default MessagePanel