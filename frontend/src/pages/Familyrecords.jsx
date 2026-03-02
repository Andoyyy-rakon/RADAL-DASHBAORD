
import { Menu, X, Home, BarChart3, FileText,Mail,House, MessageSquare, Globe, LogOut, ChevronRight, Bell, Settings,User,icons,UsersRound,PcCase,UserRoundPen,CircleUserRound} from 'lucide-react';
import { useState,useMemo,useEffect,useContext } from 'react';
import api from '../axios/AxiosApiFormat';
import Familyinfo from './Familyinfo';
import io from "socket.io-client";
import { UserContext } from '../usercontext/UserContext';



const Familyrecords = () => {

  

  const {data,setdata}=useContext(UserContext)
  const [message,setmessage] =useState("");
  const [showSuccess,setShowSuccess]=useState(false)

  const [searchTerm, setSearchTerm] = useState("");      // for search input
  const [memberFilter, setMemberFilter] = useState("ALL"); // for size filter
  const [sortBy, setSortBy] = useState("NEWEST");

//para ni sa max chart sa babaw
  const stats = useMemo(() => {
  const totalHouseholds = data.length;

  const totalMembers = data.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const averageMembers =
    totalHouseholds === 0 ? 0 : (totalMembers / totalHouseholds).toFixed(1);

  const largestFamily =
    data.length === 0
      ? null
      : data.reduce((max, item) =>
          Number(item.quantity) > Number(max.quantity) ? item : max
        );

  return {
    totalHouseholds,
    totalMembers,
    averageMembers,
    largestFamily,
  };
}, [data]);


//Para ni sa search and 
const filteredData = useMemo(() => {
  let filtered = data.filter((item) => {
    // 1. Search by family name
    const nameMatch = item.family_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // 2. Filter by member size
    const members = Number(item.quantity);
    let memberMatch = true;

    if (memberFilter === "SMALL") memberMatch = members >= 1 && members <= 3;
    if (memberFilter === "MEDIUM") memberMatch = members >= 4 && members <= 6;
    if (memberFilter === "LARGE") memberMatch = members >= 7 && members <= 10;
    if (memberFilter === "VERY_LARGE") memberMatch = members > 10;

    return nameMatch && memberMatch;
  });

  // 3. Sorting
  filtered.sort((a, b) => {
    if (sortBy === "NEWEST") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "OLDEST") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "NAME_ASC") return a.family_name.localeCompare(b.family_name);
    if (sortBy === "NAME_DESC") return b.family_name.localeCompare(a.family_name);
    if (sortBy === "MEMBERS_ASC") return Number(a.quantity) - Number(b.quantity);
    if (sortBy === "MEMBERS_DESC") return Number(b.quantity) - Number(a.quantity);
    if (sortBy === "ID_ASC") return (a.device_id || 0) - (b.device_id || 0);
    if (sortBy === "ID_DESC") return (b.device_id || 0) - (a.device_id || 0);
    return 0;
  });

  return filtered;
}, [data, searchTerm, memberFilter, sortBy]);





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

  socket.on("event_deleted",({_id})=>{
    setdata(prev=>prev.filter(item=>item._id!==_id))
  });

  // Cleanup on unmount
  return () => {
    socket.off("new_record");
    socket.off("record_updated");
    socket.off("event_deleted");

  };
}, []);


  const handleDelete = async(_id)=>{
    try{

      await api.delete(`/users/delete/${_id}`)

    }catch(error){
      console.log(error)
    }
  }



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


        {!toggle &&<div className='h-full flex-1 mx-auto pt-10 lg:min-w-full px-5'>

          {/* Dashboard Overview */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white p-5 rounded-2xl shadow-lg">
      <p className="text-gray-500 text-sm">Total Households</p>
      <p className="text-3xl font-bold text-gray-800">{stats.totalHouseholds}</p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow-lg">
      <p className="text-gray-500 text-sm">Total Members</p>
      <p className="text-3xl font-bold text-gray-800">{stats.totalMembers}</p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow-lg">
      <p className="text-gray-500 text-sm">Avg Members / Family</p>
      <p className="text-3xl font-bold text-gray-800">{stats.averageMembers}</p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow-lg">
      <p className="text-gray-500 text-sm">Largest Family</p>
      <p className="text-lg font-bold text-gray-800">
        {stats.largestFamily ? `${stats.largestFamily.family_name} (${stats.largestFamily.quantity})` : "—"}
      </p>
    </div>
  </div>

  <div className="flex flex-col md:flex-row  items-center pt-8 justify-end mb-2">
  {/* Search */}
  <div className='bg-white px-3 py-2 rounded-lg space-x-5'>
<input
    type="text"
    placeholder="Search family name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="transition-all duration-300 ease-in-out w-full md:w-72 px-4 py-2 rounded-xl border border-gray-300 focus:border-none shadow-sm focus:ring-2 bg-gray-50 focus:ring-orange-400 outline-none"
  />

  {/* Member Filter */}
  <select
    value={memberFilter}
    onChange={(e) => setMemberFilter(e.target.value)}
    className="transition-all duration-300 ease-in-out px-4 py-2 rounded-xl border shadow-sm focus:ring-2 bg-gray-50 focus:border-none focus:ring-orange-400 outline-none"
  >
    <option value="ALL">All Members</option>
    <option value="SMALL">Small (1–3)</option>
    <option value="MEDIUM">Medium (4–6)</option>
    <option value="LARGE">Large (7–10)</option>
    <option value="VERY_LARGE">Very Large (10+)</option>
  </select>

  {/* Sort By */}
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="transition-all duration-300 ease-in-out px-4 py-2 rounded-xl border shadow-sm focus:ring-2  bg-gray-50 focus:border-none focus:ring-orange-400 outline-none"
  >
    <option value="NEWEST">Newest</option>
    <option value="OLDEST">Oldest</option>
    <option value="NAME_ASC">Name A → Z</option>
    <option value="NAME_DESC">Name Z → A</option>
    <option value="MEMBERS_ASC">Members ↑</option>
    <option value="MEMBERS_DESC">Members ↓</option>
    <option value="ID_ASC">Device ID ↑</option>
    <option value="ID_DESC">Device ID ↓</option>
  </select>
  </div>
  
</div>


{/* Cards grid area ni */}

          {filteredData.length === 0 ? (
    <div className="bg-white rounded-2xl shadow-md p-10 lg:w-1/2 m-auto mt-10 text-center text-gray-500">
      No household records found.
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-x-12 gap-y-1 ">
      {filteredData.map((item) => (
        <div className='pt-12 pb-10 relative transition-all duration-300'  key={item._id}>
        <Familyinfo
          key={item._id}
          {...item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        </div>
      ))}
    </div>
  )}
        </div>}
        
    </div>
  )
}

export default Familyrecords