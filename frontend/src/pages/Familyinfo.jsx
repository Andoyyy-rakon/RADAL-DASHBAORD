import React, { useState } from 'react';
import { Pencil, Trash, CircleUserRound, Monitor as PcCase } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import NumberInput from '../components/NumberInput';

const Familyinfo = ({_id,device_id,family_name,quantity,createdAt,location,onEdit,onDelete,showToast}) => {

    const [toolBar,setToolbar] = useState(false);
    const [toolTitle,setToolTitle] = useState(false)
    const [edit,setedit] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
 
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
    showToast("Record updated successfully!", "success");

    setrecords({device_id:"",family_name:"",quantity:"",location:""})
    setedit(false)
    setToolbar(false)
    
  }

  return (
            <div className="relative group">
                <ConfirmationModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => onDelete(_id)}
                    title="Delete Household Record"
                    message={`Are you sure you want to permanently delete the ${family_name} family record? This action cannot be undone.`}
                />
                
                {toolBar && (
                    <div className="absolute -top-12 right-4 bg-white dark:bg-slate-800 shadow-2xl px-4 py-2 rounded-2xl flex gap-4 transition-all duration-300 border border-slate-100 dark:border-slate-700 z-10 animate-in fade-in slide-in-from-bottom-2">
                        <button 
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-[#FACC15] transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setedit(!edit);
                                setrecords({ device_id, family_name, quantity, location });
                            }}
                        >
                            <Pencil size={18} />
                            <span className="text-sm font-bold">Edit</span>
                        </button>
                        
                        {!edit && (
                            <button 
                                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModalOpen(true);
                                }}
                            >
                                <Trash size={18} />
                                <span className="text-sm font-bold">Delete</span>
                            </button>
                        )}
                    </div>
                )}

                <div 
                    className={`${toolBar ? 'border-[#FACC15] ring-2 ring-inset ring-[#FACC15] bg-slate-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-700'} 
                    w-full relative min-h-[160px] border-2 shadow-xl p-6 rounded-3xl hover:border-[#FACC15] transition-all duration-300 cursor-pointer group-hover:shadow-2xl overflow-hidden`}
                    onClick={() => setToolbar(!toolBar)}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FACC15]/5 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:bg-[#FACC15]/10"></div>
                    
                    <div className='flex justify-between items-start mb-4'>
                        <div className="flex items-center gap-2 text-[#FACC15]">
                            <PcCase size={20} />
                            <span className="text-xs font-black uppercase tracking-widest opacity-60">Handheld Unit</span>
                        </div>
                        <CircleUserRound size={24} className="text-slate-300 dark:text-slate-600 group-hover:text-[#FACC15] transition-colors" />
                    </div>

                    <div className='space-y-4 relative z-10'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">Device ID</label>
                                {edit ? (
                                    <input type='text' required value={records.device_id} name='device_id' onChange={handleEditChange} onClick={(e) => e.stopPropagation()}
                                    className='w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-3 text-sm font-bold focus:ring-2 focus:ring-inset focus:ring-[#FACC15] outline-none dark:text-white' />
                                ) : (
                                    <p className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{device_id}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">Family Name</label>
                                {edit ? (
                                    <input type='text' required value={records.family_name} name='family_name' onChange={handleEditChange} onClick={(e) => e.stopPropagation()}
                                    className='w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-3 text-sm font-bold focus:ring-2 focus:ring-inset focus:ring-[#FACC15] outline-none dark:text-white' />
                                ) : (
                                    <p className="text-lg font-black text-slate-800 dark:text-white tracking-tight uppercase">{family_name}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">Household Members</label>
                                {edit ? (
                                    <NumberInput 
                                        value={records.quantity}
                                        onChange={handleEditChange}
                                        min={1}
                                        max={30}
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{quantity}</p>
                                        <span className="text-[10px] font-bold py-0.5 px-2 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full uppercase">People</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">Primary Location</label>
                                {edit ? (
                                    <textarea required value={records.location} name='location' onChange={handleEditChange} onClick={(e) => e.stopPropagation()} 
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-3 text-sm font-bold focus:ring-2 focus:ring-inset focus:ring-[#FACC15] outline-none dark:text-white resize-none h-20" />
                                ) : (
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-tight line-clamp-2 italic">“{location}”</p>
                                )}
                            </div>
                        </div>

                        {edit && (
                            <div className='w-full flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700'>
                                <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setedit(false); }}>Cancel</button>
                                <button className='bg-[#FACC15] text-[#1E293B] font-black py-2 px-6 rounded-xl hover:bg-yellow-500 active:scale-95 transition-all text-sm'
                                    onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
                                    Update Record
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
  )
}

export default Familyinfo