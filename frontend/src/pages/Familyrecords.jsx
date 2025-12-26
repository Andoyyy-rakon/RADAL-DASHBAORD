
import { Menu, X, Home, BarChart3, FileText, MessageSquare, Globe, LogOut, ChevronRight, Bell, Settings,User,icons,UsersRound,PcCase,UserRoundPen,CircleUserRound} from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../axios/AxiosApiFormat';
import Familyinfo from './Familyinfo';
import io from "socket.io-client";
import { UserContext } from '../usercontext/UserContext';
import { useContext } from 'react';


const Familyrecords = () => {

  

  const {data,setdata}=useContext(UserContext)
  const [message,setmessage] =useState("");
  const [showSuccess,setShowSuccess]=useState(false)


  const [records,setrecords]=useState({
  device_id:"",
  family_name:"",
  quantity:"",
  location:""
})
  const [toggle,settoggle] = useState(false)

 const getAllInfo = async()=>{
    const list = await api.get('/users/getAllinfo');

    setdata(list.data.data)
 }


useEffect(() => {
  // Fetch existing records
  getAllInfo();

  
  // Setup Socket.IO for real-time updates
  const socket = io("http://localhost:3000");
  socket.on("new_record", (newData) => {
 
    setdata(prev => [newData, ...prev]); // prepend new record
  });

  socket.on("record_updated",(updated)=>{
    console.log("recordUp")
    setdata(prev=>prev.map(item=>item._id==updated._id.toString()?updated:item))
  })

  // Cleanup on unmount
  return () => {
    socket.off("new_record");
    socket.off("record_updated");

  };
}, []);



//Handle the edit of existing info
  const handleEdit = async(_id,updatedData)=>{

    const duplicated = data.some(item=>item.device_id==updatedData.device_id&&item._id!=_id)

    if (duplicated) {
        return console.log("Device ID is already exist");
    }

    try{
      await api.put(`/users/update/${_id}`,updatedData)
    }
    catch(error){
      console.log(error)
    }
  }



 const handleChange =(e)=>{
  setrecords(prev=>({...prev,[e.target.name]:e.target.value}));
 }

 const handleSubmit =async(e)=>{
  e.preventDefault();

  if(records.device_id===""||records.family_name===""||records.quantity===""||records.location==="")return alert("Please input all fields");

  try{
    const res =await api.post('/users/register',records);
    console.log(res.data?.success);
    if(res.data?.success){
      setmessage(res.data?.message||"Registered Successfully");
      setShowSuccess(true);
        setrecords({
        device_id:"",
        family_name:"",
        quantity:"",
        location:""
      })
      setTimeout(()=>{
        setShowSuccess(false);
        settoggle(false);
      },2000);
    }


  }catch(error){
    setmessage(error.response?.data?.message || "Registration faild")
    setShowSuccess(true)
    setTimeout(()=>{
      setShowSuccess(false)
    },5000)
    console.log(error.response?.data?.message ||"Registration faild")
  }


 }

  return (

    <div className='flex flex-col flex-1 pl-[90px]  bg-orange-50 px-5'>
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

        <div className={`success-toast bg-yellow-500 shadow-lg ${showSuccess?"show":""}`}>
            <h1>{message}</h1>
        </div>

       {toggle&& <div className='h-full flex-1 mx-auto pt-10'>
                <form className="mx-auto w-[400px] bg-white shadow-2xl flex flex-col gap-3 px-10 py-6 rounded-2xl" onSubmit={handleSubmit}>
                          <p className="text-2xl text-gray-800 font-extrabold">Family Information</p>

                          <div className="relative w-full">
                            <input 
                              required 
                              type="text"
                              name='device_id'
                              value={records.device_id}
                              onChange={handleChange}
                              className="peer mt-4 w-full h-[45px] border border-gray-200 rounded-lg outline-none bg-transparent px-3 focus:border-orange-500"
                            />
                            <label 
                              className="absolute top-6 left-3 text-gray-400 transition-all duration-300 pointer-events-none 
                              peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1
                              peer-valid:top-1 peer-valid:left-2 peer-valid:text-xs peer-valid:text-orange-500 peer-valid:bg-white peer-valid:px-1"
                            >
                              Device ID
                            </label>
                          </div>


                          <div className="relative w-full">
                            <input 
                              required 
                              type="text"
                              name='family_name'
                              value={records.family_name}
                              onChange={handleChange}
                              className="peer mt-4 w-full h-[45px] border border-gray-200 rounded-lg outline-none bg-transparent px-3 focus:border-orange-500"
                            />
                            <label 
                              className="absolute top-6 left-3 text-gray-400 transition-all duration-300 pointer-events-none 
                              peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1
                              peer-valid:top-1 peer-valid:left-2 peer-valid:text-xs peer-valid:text-orange-500 peer-valid:bg-white peer-valid:px-1"
                            >
                              Family Name
                            </label>
                          </div>

                          <div className="relative w-full">
                            <input 
                              required 
                              type="number"
                              value={records.quantity}
                              name='quantity'
                              onChange={handleChange}
                              min={0}
                              max={30}
                              className="peer mt-4 w-full h-[45px] border border-gray-200 rounded-lg outline-none bg-transparent px-3 focus:border-orange-500"
                            />
                            <label 
                              className="absolute top-6 left-3 text-gray-400 transition-all duration-300 pointer-events-none 
                              peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1
                              peer-valid:top-1 peer-valid:left-2 peer-valid:text-xs peer-valid:text-orange-500 peer-valid:bg-white peer-valid:px-1"
                            >
                              Members
                            </label>
                          </div>


                          <div className="relative w-full">
                            <textarea 
                              required
                              rows="4"
                              onChange={handleChange}
                              name='location'
                              value={records.location}
                              className="peer mt-4 w-full border border-gray-200 rounded-lg outline-none bg-transparent px-3 py-2 focus:border-orange-500 resize-none"
                            ></textarea>
                            <label 
                              className="absolute top-6 left-3 text-gray-400 transition-all duration-300 pointer-events-none 
                              peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1
                              peer-valid:top-1 peer-valid:left-2 peer-valid:text-xs peer-valid:text-orange-500 peer-valid:bg-white peer-valid:px-1"
                            >
                              Location / Landmarks
                            </label>
                          </div>

                          <button 
                            className="bg-yellow-500 text-white py-2 rounded-lg font-semibold border-2 border-transparent hover:border-yellow-500 hover:bg-white hover:text-yellow-500 active:bg-yellow-500 active:text-white transition-all duration-300"
                          >
                            Submit
                          </button>
                </form>

        </div>}


        {!toggle &&<div className='h-full flex-1 mx-auto pt-10'>
          <div className='grid grid-cols-2 gap-x-12 gap-y-12 '>
            {data.map(item=>(
              <div className='pt-12 pb-10 relative transition-all duration-300'  key={item._id}>
                <Familyinfo {...item} onEdit={handleEdit}/>
              </div>
            ))}
            </div>
        </div>}
        
    </div>
  )
}

export default Familyrecords