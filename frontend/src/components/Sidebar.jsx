import React, { useContext, useState } from 'react';
import { Menu, X, Home, BarChart3, FileText, MessageSquare, Globe, LogOut, ChevronRight, Bell, Settings, icons,UsersRound, Moon, Sun} from 'lucide-react';
import { Link,useLocation } from 'react-router-dom';
import { UserContext } from '../usercontext/UserContext';
import { assets } from '../assets/asset';
import authAxios from '../api/authAxios';
import LogoutModal from './LogoutModal';


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
      const [darkMode, setDarkMode] = useState(false);
      const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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

      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };

  const logout = async () => {
  try {
    await authAxios.post("/logout"); 
    localStorage.removeItem("accessToken"); 
    window.location.href = "/login"; 
  } catch (err) {
    console.error("Logout failed:", err);
  }
  
};
  return (
        <aside className={`bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black shadow-2xl min-h-full fixed z-50 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col border-r border-slate-700/50`}>
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between ">
              <div className={`flex items-center space-x-3 relative ${!isSidebarOpen?"right-1":""} `}>
                <div className={`w-10 h-10 bg-transparent hover:bg-slate-700/50 rounded-full transition-all duration-300 flex items-center text-white font-bold text-xl justify-center`}>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg transition"
                    >{isSidebarOpen ? <X size={23} className='text-slate-400 hover:text-white transition-all' /> : <Menu size={23} className='text-slate-400 hover:text-white transition-all' />}
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="p-5 border-b border-slate-700/50">
            <div className={`flex text-white items-center space-x-4 ${!isSidebarOpen && 'justify-center'}`}>
              <div className='bg-white p-1.5 w-10 h-10 rounded-xl shadow-lg'>
                <img src={assets.Ligtaslogo} alt="" className='w-full h-full object-contain' />
              </div>
              {isSidebarOpen && (
                <div className="font-black tracking-tighter text-xl text-white">
                  LIGTAS
                </div>
              )}
            </div>
          </div>


          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <ul className="space-y-1">
              {[
                { icon: Home, label: 'Dashboard', to:"/", notification: true },
                { icon: BarChart3, label: 'Acknowledge', to:"acknowledge" },
                { icon: FileText, label: 'Manual', to:"manual" },
                { icon: UsersRound, label: 'Household Records', to:"records" },
              ].map((item, idx) => (
<li key={item.label}>
  <Link
    to={item.to}
    className={`flex items-center ${
      isSidebarOpen ? "justify-start" : "justify-center"
    } space-x-3 p-3.5 rounded-xl transition-all duration-200 group ${
      item.label === activeMenu
        ? "bg-[#FACC15] text-slate-900 shadow-lg shadow-yellow-500/20"
        : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
    }`}
  >
    <item.icon
      size={20}
      className={`transition-colors ${
        item.label === activeMenu
          ? "text-slate-900"
          : "text-slate-400 group-hover:text-white"
      }`}
    />

    <span className={`text-sm font-bold ${!isSidebarOpen && "hidden"}`}>
      {item.label}
    </span>

    {item.notification && isSidebarOpen && (
      <span className="ml-auto bg-red-500 text-white text-[10px] item-center font-black px-2 py-0.5 rounded-full">
        {reports.filter(r => !r.response_bool).length}
      </span>
    )}
  </Link>
</li>
              ))}
              
              <li key="darkmode">
                <button
                  onClick={toggleDarkMode}
                  className={`w-full flex items-center ${
                    isSidebarOpen ? "justify-start" : "justify-center"
                  } space-x-3 p-3.5 rounded-xl transition-all duration-200 text-slate-400 hover:bg-slate-700/50 hover:text-white`}
                >
                  {darkMode ? <Sun size={20} className="text-yellow-400 shadow-glow" /> : <Moon size={20} />}
                  <span className={`text-sm font-bold transition-opacity duration-300 ${!isSidebarOpen ? "opacity-0 w-0 hidden" : "opacity-100"}`}>
                    {darkMode ? 'Light Theme' : 'Dark Theme'}
                  </span>
                </button>
              </li>
            </ul>

<div className="pt-4 border-t border-slate-700/50">
    <button
      onClick={() => setIsLogoutModalOpen(true)}
      className={`w-full flex items-center ${
        isSidebarOpen ? "justify-start" : "justify-center"
      } space-x-3 p-3.5 rounded-xl transition-all duration-200 text-red-400 hover:bg-red-500 hover:text-white group`}
    >
      <LogOut size={20} />
      <span className={`text-sm font-bold transition-opacity duration-300 ${!isSidebarOpen ? "opacity-0 w-0 hidden" : "opacity-100"}`}>
        Sign Out
      </span>
    </button>
</div>

<LogoutModal 
  isOpen={isLogoutModalOpen}
  onClose={() => setIsLogoutModalOpen(false)}
  onConfirm={logout}
/>
          </nav>
        </aside>
  )
}

export default Sidebar