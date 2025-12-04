import React, { useState } from 'react';
import { Menu, X, Home, BarChart3, FileText, MessageSquare, Globe, LogOut, ChevronRight, Bell, Settings, icons,UsersRound} from 'lucide-react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);

      const [activeMenu,setActiveMenu] =useState("Dashboard")
    
      const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
        <aside className={`bg-neutral-900 shadow-lg min-h-screen  transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col `}>
          <div className="p-6 border-b border-gray-600">
            <div className="flex items-center justify-between ">
              <div className={`flex items-center space-x-3 relative ${!isSidebarOpen?"right-1":""} `}>
                <div className={`w-10  h-10 bg-neutral-900 rounded-full transition-all duration-300 hover:bg-neutral-800 flex items-center  text-white font-bold text-xl justify-center`}>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg transition"
                    >{isSidebarOpen ? <X size={23} className='hover:text-orange-600  transition-all duration-300' /> : <Menu size={23} className='hover:text-orange-600  transition-all duration-300' />}
                    </button>
                </div>
              </div>

            </div>
          </div>

          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className={`flex text-white items-center space-x-4 ${!isSidebarOpen && 'justify-center'}`}>
              <h1>Logo</h1>
              {isSidebarOpen && (
                <div>
                  Aldar
                </div>
              )}
            </div>
          </div>


          {/* Navigation */}
          <nav className="flex-1 p-4 transition-all duration-300">
            <ul className="space-y-2">
              {[
                { icon: Home, label: 'Dashboard', to:"/", notification: true },
                { icon: BarChart3, label: 'Acknowledge', to:"acknowledge" },
                { icon: FileText, label: 'Manual', to: "/manual" },
                {icon:UsersRound,label:'Household Records',to:"records"},
                { icon: Settings, label: 'Settings', to: "/settings"},

              ].map((item, idx) => (
                <li key={item.label} onClick={()=>setActiveMenu(item.label)}>
                  <Link
                    to={item.to}
                    className={`flex items-center ${isSidebarOpen?"justify-start":"justify-center"}  space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      item.label===activeMenu
                        ? 'bg-[#FDFDFD] text-orange-700 font-medium'
                        : 'hover:bg-neutral-800 text-[#FDFDFD]'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className={`${!isSidebarOpen && 'hidden'}`}>{item.label}</span>
                    {item.notification && isSidebarOpen && (
                      <span className="ml-auto bg-orange-700 text-white text-xs px-2 py-1 rounded-full">1</span>
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