import React, { useContext, useEffect, useState, useMemo } from 'react';
import { CircleUserRound, FileText, Home, User, BarChart3, Star, Search, UsersRound } from 'lucide-react';
import Familyinfo from './Familyinfo';
import { UserContext } from '../usercontext/UserContext';
import axiosPrivate from '../api/axiosPrivate';
import Toast from '../components/Toast';
import io from "socket.io-client";
import NumberInput from '../components/NumberInput';

const Familyrecords = () => {
    const { data, setdata, assets } = useContext(UserContext);
    const [showSuccess, setShowSuccess] = useState(false);
    const [toastConfig, setToastConfig] = useState({ message: '', type: 'success' });
    const [toggle, settoggle] = useState(false);
    const [fetch, setfetch] = useState(false);
    const [records, setrecords] = useState({ device_id: "", family_name: "", quantity: "", location: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [memberFilter, setMemberFilter] = useState("ALL");
    const [sortBy, setSortBy] = useState("NEWEST");

    const showToast = (msg, type = 'success') => {
        setToastConfig({ message: msg, type });
        setShowSuccess(true);
    };

    const stats = useMemo(() => {
        const totalHouseholds = data.length;
        const totalMembers = data.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
        const averageMembers = totalHouseholds === 0 ? 0 : (totalMembers / totalHouseholds).toFixed(1);
        const largestFamily = data.length === 0 ? null : data.reduce((max, item) => 
            Number(item.quantity) > Number(max?.quantity || 0) ? item : max, null);

        return { totalHouseholds, totalMembers, averageMembers, largestFamily };
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







 const getAllInfo = async()=>{
    const list = await axiosPrivate.get('/users/getAllinfo');

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
    socket.disconnect();
  };
}, []);


  const handleDelete = async(_id)=>{
    try{

      await axiosPrivate.delete(`/users/delete/${_id}`)

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
      await axiosPrivate.put(`/users/update/${_id}`,updatedData)
    }
    catch(error){
      console.log(error)
    }
  }



 const handleChange =(e)=>{
  setrecords(prev=>({...prev,[e.target.name]:e.target.value})); 
 }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (records.device_id === "" || records.family_name === "" || records.quantity === "" || records.location === "") {
        return showToast("Please input all fields", "error");
    }

    try {
        const res = await axiosPrivate.post('/users/register', records);
        if (res.data?.success) {
            showToast(res.data?.message || "Registered Successfully!");
            setrecords({ device_id: "", family_name: "", quantity: "", location: "" });
            settoggle(false);
            setfetch(prev => !prev);
        } else {
            showToast(res.data?.message || "Registration failed", "error");
        }
    } catch (error) {
        showToast(error.response?.data?.message || "Registration failed", "error");
    }
  };

  return (

    <div className='flex flex-col flex-1 bg-slate-50 dark:bg-slate-900 transition-colors duration-300'>
        <nav className='flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 px-4 sm:px-8 gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-md'>
            <h1 className='text-3xl font-bold text-slate-800 dark:text-white'>Household Records</h1>

            <button
            type="submit"
            className="flex justify-center gap-2 items-center shadow-lg text-md bg-white dark:bg-slate-800 font-bold text-slate-700 dark:text-white border-2 border-slate-100 dark:border-slate-700 hover:border-[#FACC15] hover:bg-[#FACC15] hover:text-[#1E293B] transition-all px-6 py-2.5 rounded-xl group"
            onClick={()=>settoggle(prev=>!prev)}
            >
            {!toggle && <span>Register Family</span>}
            {toggle && <span>View Records</span>}
            {!toggle && <CircleUserRound className='text-[#FACC15] group-hover:text-[#1E293B]' size={22}/>}
            {toggle && <FileText className='text-[#FACC15] group-hover:text-[#1E293B]' size={21}/>}
            </button>
        </nav>

        <Toast 
            isVisible={showSuccess}
            message={toastConfig.message}
            type={toastConfig.type}
            onClose={() => setShowSuccess(false)}
        />

       {toggle && <div className='h-full flex-1 p-6'>
                <form className="mx-auto w-full max-w-[450px] bg-white dark:bg-slate-800 shadow-2xl flex flex-col gap-5 p-8 rounded-3xl border border-slate-100 dark:border-slate-700" onSubmit={handleSubmit}>
                          <p className="text-2xl text-slate-800 dark:text-white font-extrabold mb-2">Family Registration</p>

                          <div className="space-y-4">
                            <div className="relative">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Device ID</label>
                                <input 
                                  required 
                                  type="text"
                                  name='device_id'
                                  value={records.device_id}
                                  onChange={handleChange}
                                  placeholder="Enter device ID..."
                                  className="w-full mt-1 p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-inset focus:ring-[#FACC15] dark:text-white transition-all"
                                />
                            </div>

                            <div className="relative">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Family Name</label>
                                <input 
                                  required 
                                  type="text"
                                  name='family_name'
                                  value={records.family_name}
                                  onChange={handleChange}
                                  placeholder="Enter family name..."
                                  className="w-full mt-1 p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-inset focus:ring-[#FACC15] dark:text-white transition-all"
                                />
                            </div>

                            <NumberInput 
                              label="Member Count"
                              value={records.quantity}
                              onChange={handleChange}
                              min={1}
                              max={30}
                            />

                            <div className="relative">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Location / Landmarks</label>
                                <textarea 
                                  required
                                  rows="3"
                                  onChange={handleChange}
                                  name='location'
                                  value={records.location}
                                  placeholder="Enter address or nearby landmarks..."
                                  className="w-full mt-1 p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-inset focus:ring-[#FACC15] dark:text-white resize-none transition-all"
                                ></textarea>
                            </div>
                          </div>

                          <button 
                            className="bg-[#FACC15] text-[#1E293B] py-3.5 rounded-xl font-bold text-lg hover:bg-yellow-500 shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all mt-4"
                          >
                            Submit Application
                          </button>
                </form>

        </div>}


        {!toggle && <div className='h-full flex-1 p-4 sm:p-6 lg:p-8 space-y-8'>

          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg flex items-center gap-5 border border-slate-100 dark:border-slate-700 transition-all hover:scale-[1.02]">
              <div className='p-3.5 bg-slate-50 dark:bg-slate-900 text-[#FACC15] rounded-xl shadow-inner'>
                <Home size={24}/>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Households</p>
                <p className="text-3xl font-black text-slate-800 dark:text-white">{stats.totalHouseholds}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg flex items-center gap-5 border border-slate-100 dark:border-slate-700 transition-all hover:scale-[1.02]">
              <div className='p-3.5 bg-slate-50 dark:bg-slate-900 text-[#FACC15] rounded-xl shadow-inner'>
                  <User size={24}/>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Members</p>
                <p className="text-3xl font-black text-slate-800 dark:text-white">{stats.totalMembers}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg flex items-center gap-5 border border-slate-100 dark:border-slate-700 transition-all hover:scale-[1.02]">
              <div className='p-3.5 bg-slate-50 dark:bg-slate-900 text-[#FACC15] rounded-xl shadow-inner' >
                <BarChart3 size={24}/>
              </div>
              <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Avg Members / Family</p>
                  <p className="text-3xl font-black text-slate-800 dark:text-white">{stats.averageMembers}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg flex items-center gap-5 border border-slate-100 dark:border-slate-700 transition-all hover:scale-[1.02]">
              <div className='p-3.5 bg-slate-50 dark:bg-slate-900 text-[#FACC15] rounded-xl shadow-inner'>
                  <Star size={24}/>
              </div>
              <div className="min-w-0">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Largest Family</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white truncate">
                {stats.largestFamily ? `${stats.largestFamily.family_name} (${stats.largestFamily.quantity})` : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 justify-end mb-6 bg-white dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="relative w-full md:w-80">
                <Search
                  size={18}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-200 ${searchTerm ? 'opacity-0' : 'opacity-100'}`}
                />
                <input
                  type="text"
                  placeholder="Search families..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-[#FACC15] outline-none dark:text-white transition-all"
                />
              </div>

              <select
                value={memberFilter}
                onChange={(e) => setMemberFilter(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-[#FACC15] outline-none dark:text-white transition-all cursor-pointer"
              >
                <option value="ALL">All Sizes</option>
                <option value="SMALL">Small (1–3)</option>
                <option value="MEDIUM">Medium (4–6)</option>
                <option value="LARGE">Large (7–10)</option>
                <option value="VERY_LARGE">Very Large (10+)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-[#FACC15] outline-none dark:text-white transition-all cursor-pointer"
              >
                <option value="NEWEST">Newest First</option>
                <option value="OLDEST">Oldest First</option>
                <option value="NAME_ASC">Name (A–Z)</option>
                <option value="NAME_DESC">Name (Z–A)</option>
                <option value="MEMBERS_DESC">Members (High-Low)</option>
                <option value="MEMBERS_ASC">Members (Low-High)</option>
              </select>
          </div>

          {filteredData.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-16 text-center border border-slate-100 dark:border-slate-700">
              <UsersRound size={48} className="mx-auto text-slate-300 mb-4"/>
              <p className="text-slate-500 dark:text-slate-400 font-medium">No household records found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredData.map((item) => (
                <div className='relative transition-all duration-300' key={item._id}>
                <Familyinfo
                  {...item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showToast={showToast}
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