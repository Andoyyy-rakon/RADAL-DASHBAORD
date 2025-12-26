import React from 'react'
import { Menu, X, Home, BarChart3, FileText, MessageSquare,Trash,Pencil, Globe, LogOut, ChevronRight, Bell, Settings,User,icons,UsersRound,PcCase,UserRoundPen,CircleUserRound} from 'lucide-react';
import { useState } from 'react';


const Familyinfo = ({_id,device_id,family_name,quantity,createdAt,location,onEdit}) => {

    const [toolBar,setToolbar] = useState(false);
    const [toolTitle,setToolTitle] = useState(false)
    const [edit,setedit] = useState(false)
 
    const [records,setrecords]=useState({
        device_id,
        family_name,
        quantity,
        location
      })


  const handleEditChange =(e)=>{
    setrecords(prev=>({...prev,[e.target.name]:e.target.value}))

  }


  const handleEdit = ()=>{

    if(records.device_id===""||records.family_name===""||records.quantity===""||records.location==="") return console.log("Please input all fields")
    
    onEdit(_id,records)

    setrecords({device_id:"",family_name:"",quantity:"",location:""})
    setedit(false)
    setToolbar(false)
    
  }

  return (

            <>
                
                {toolBar&&
                <div className='absolute top-0 right-10 bg-white shadow-xl px-3 py-2 rounded-xl flex gap-2 transition-all duration-300'>
                    <div className="flex items-center space-x-2">


                    <div className="group  flex items-center">
                        <Pencil 
                        className="text-orange-500 transition-all duration-300 hover:scale-150 cursor-pointer" 
                        size={20}
                        onClick={(e)=>{
                          e.stopPropagation()
                          setedit(prev=>!prev)
                              setrecords({
                                  device_id,
                                  family_name,
                                  quantity,
                                  location
                                });
                        }}
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


                    {!edit&&<div className="group  flex items-center">
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
                    </div>}
                    </div>

                    
                </div>}
              <div className='bg-white relative min-h-[200px]   border-2 border-transparent shadow-xl p-8 rounded-2xl  hover:border-2 hover:border-orange-500 transition-all duration-300 cursor-pointer' onClick={()=>{
                setToolbar(prev=>!prev)
              }}>
                <div className='flex justify-end text-orange-500 absolute top-3 right-5'>
                    <User/>
                </div>
                <div className='space-y-1 transition-all duration-300'>
                  <div className='flex'><span className='mr-1 text-orange-500'><PcCase/></span><span className='font-medium mr-1'>Device Id:</span>{!edit&&device_id}{edit&&<input type='text' required value={records.device_id} name='device_id' onChange={handleEditChange}  onClick={(e) => e.stopPropagation()}
                  className='border border-black rounded-sm text-sm pl-1 focus:outline-none focus:ring-0' />}</div>
                  <div className='ml-7'><span className='font-medium mr-1'>Family name:</span>{!edit&&family_name}{edit&&<input type='text' required value={records.family_name} name='family_name' onChange={handleEditChange} onClick={(e) => e.stopPropagation()}
                   className='border border-black rounded-sm pl-1 focus:outline-none text-sm focus:ring-0 ml-1' />}</div>
                  <div className='ml-7' ><span className='font-medium'>Members:</span> {!edit&&quantity}{edit&&<input type='number' required value={records.quantity} name='quantity' onChange={handleEditChange} onClick={(e) => e.stopPropagation()}
                   className='border border-black  rounded-sm pl-1 focus:outline-none text-sm focus:ring-0' />}</div>
                  <div className='ml-7'><span className='font-medium'>location:</span> {!edit&&location}{edit&&<textarea type='number' required value={records.location} name='location' onChange={handleEditChange} onClick={(e) => e.stopPropagation()} 
                  className="peer mt-4 w-full border border-black rounded-lg outline-none bg-transparent px-3 py-2 focus:border-orange-500 resize-none" />}</div>

                  {edit&&<div className='w-full flex justify-end pr-1'><button className='bg-yellow-500 font-semibold text-white py-2 px-5 border-2 border-transparent hover:border-yellow-500 hover:bg-white hover:text-yellow-500 active:bg-yellow-500 active:text-white transition-all duration-300  rounded-lg'
                  onClick={(e)=>{
                    e.stopPropagation()
                    handleEdit()
                  }}
                  >Save</button></div>}
                </div>
              </div>
              </>
     
  )
}

export default Familyinfo