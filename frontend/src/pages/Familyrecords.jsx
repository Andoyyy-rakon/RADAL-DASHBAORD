import React from 'react'
import { Menu, X, Home, BarChart3, FileText, MessageSquare, Globe, LogOut, ChevronRight, Bell, Settings,User,icons,UsersRound,PcCase,UserRoundPen,CircleUserRound} from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../axios/AxiosApiFormat';

const Familyrecords = () => {

  const [data,setdata]=useState([]);

  const [toggle,settoggle] = useState(false)

 const getAllInfo = async()=>{
    const list = await api.get('/users/getAllinfo');

    setdata(list.data.data)
 }


 useEffect(()=>{
   getAllInfo()
 },[])


 

  return (


    
    <div className='flex flex-col flex-1  bg-orange-50'>
        <nav className='flex   justify-between items-center py-6 px-7'>
            <h1  className='text-2xl font-bold text-orange-700'>Household Records</h1>

            <button
            type="submit"
            className="flex justify-center gap-1 items-center shadow-xl text-md bg-gray-50 backdrop-blur-md font-medium isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-yellow-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group "
            onClick={()=>settoggle(prev=>!prev)}
            >
            {!toggle && <h1>Register</h1>}
            {toggle && <h1>Records</h1>}
            {!toggle&&<CircleUserRound className='text-orange-700 group-hover:text-white' size={24}/>}
            {toggle&&<FileText className='text-orange-700 group-hover:text-white' size={23}/>}
            
            </button>

        </nav>

       {toggle&& <div className='h-full flex-1 mx-auto pt-10'>

          <div className='w-[500px] h-[500px] bg-white shadow-xl rounded-xl'>
  

          </div>
        </div>}


        {!toggle &&<div className='h-full flex-1 mx-auto pt-10'>
          <div className='grid grid-cols-2 gap-x-12 gap-y-12 '>
            {data.map(item=>(
              <div key={item.device_id} className='bg-white relative   border-2 border-transparent shadow-xl p-8 rounded-2xl  hover:border-2 hover:border-orange-500 transition-all duration-300'>
                <div className='flex justify-end text-orange-500 absolute top-3 right-5'>
                    <User/>
                </div>
                <div className='space-y-1'>
                  <p className='flex'><span className='mr-1 text-orange-500'><PcCase/></span><span className='font-medium'>Device Id:</span> {item.device_id}</p>
                  <p className='ml-7'><span className='font-medium'>Family name:</span> {item.family_name}</p>
                  <p className='ml-7' ><span className='font-medium'>Members:</span> {item.quantity}</p>
                  <p className='ml-7'><span className='font-medium'>location:</span> {item.location}</p>
                </div>
              </div>
            ))}
            </div>
        </div>}
        
    </div>
  )
}

export default Familyrecords