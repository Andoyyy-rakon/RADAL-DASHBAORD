import React, { useContext, useState } from 'react';
import { Menu, X, Home, BarChart3, FileText, MessageSquare, Globe, LogOut, ChevronRight, Bell, Settings, icons,UsersRound} from 'lucide-react';
import { Link,useLocation } from 'react-router-dom';
import { UserContext } from '../usercontext/UserContext';
import { assets } from '../assets/asset';


const Sidebar = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

        const{reports,setreports}=useContext(UserContext)
        const location = useLocation();

        const pathToLabel = {
          '/': 'Dashboard',
          '/acknowledge': 'Acknowledge',
          '/manual': 'Manual',
          '/records': 'Household Records',
          '/settings': 'Settings',
        };

  
        const activeMenu =pathToLabel[location.pathname];
    
      const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
        <aside className={`bg-gradient-to-b from-[#1E293B] to-[#334155] shadow-lg min-h-full fixed z-50 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col `}>
          <div className="p-6 border-b border-gray-600">
            <div className="flex items-center justify-between ">
              <div className={`flex items-center space-x-3 relative ${!isSidebarOpen?"right-1":""} `}>
                <div className={`w-10  h-10 bg-transparent hover:bg-slate-700 rounded-full transition-all duration-300  flex items-center  text-white font-bold text-xl justify-center`}>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg transition"
                    >{isSidebarOpen ? <X size={23} className='hover:text-white text-slate-400 transition-all duration-300' /> : <Menu size={23} className='hover:text-white text-slate-400 transition-all duration-300' />}
                    </button>
                </div>
              </div>

            </div>
          </div>

          {/* Logo */}
          <div className="p-5 border-b border-gray-200">
            <div className={`flex text-white items-center space-x-4 ${!isSidebarOpen && 'justify-center'}`}>
              <div className='bg-white p-1 max-w-10 rounded-md'>
                <img src={assets.Ligtaslogo} alt="" className='w-full h-full bg-cover' />
              </div>
              {isSidebarOpen && (
                <div>
                  Aldar
                </div>
              )}
            </div>
          </div>


          {/* Navigation */}
          <nav className="flex-1 p-4 transition-all duration-300 ">
            <ul className="space-y-2">
              {[
                { icon: Home, label: 'Dashboard', to:"/", notification: true },
                { icon: BarChart3, label: 'Acknowledge', to:"acknowledge" },
                { icon: FileText, label: 'Manual', to: "/manual" },
                {icon:UsersRound,label:'Household Records',to:"records"},
                { icon: Settings, label: 'Settings', to: "/settings"},

              ].map((item, idx) => (
<li key={item.label}>
  <Link
    to={item.to}
    className={`flex items-center ${
      isSidebarOpen ? "justify-start" : "justify-center"
    } space-x-3 p-3 rounded-lg transition-all duration-300 group ${
      item.label === activeMenu
        ? "bg-[#FACC15]  text-[#1E293B] font-medium "
        : "hover:bg-slate-700 text-slate-400 hover:text-white"
    }`}
  >
    <item.icon
      size={20}
      className={`transition-colors ${
        item.label === activeMenu
          ? "text-[#1E293B]"
          : "text-slate-400 group-hover:text-white"
      }`}
    />

    <span className={`${!isSidebarOpen && "hidden"}`}>
      {item.label}
    </span>

    {item.notification && isSidebarOpen && (
      <span className="ml-auto bg-[#EF646A] text-white text-xs px-2 py-1 rounded-full">
        {reports.length}
      </span>
    )}
  </Link>
</li>
              ))}
            </ul>
          </nav>

        </aside>
  )
}

export default Sidebar