// App.jsx
import React, { useState } from 'react';
import { Menu, X, Home, BarChart3, FileText, MessageSquare, Globe, LogOut, ChevronRight, Bell, Settings } from 'lucide-react';

export default function A() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className="min-h-screen bg-orange-50 flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'justify-center'}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  C
                </div>
                <span className={`font-bold text-2xl text-gray-800 ${!isSidebarOpen && 'hidden'}`}>Crowz</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className={`flex items-center space-x-4 ${!isSidebarOpen && 'justify-center'}`}>
              <img
                src="/api/placeholder/60/60"
                alt="Robert Grant"
                className="w-14 h-14 rounded-full border-4 border-white shadow-md"
              />
              {isSidebarOpen && (
                <div>
                  <h3 className="font-semibold text-gray-800">Robert Grant</h3>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {[
                { icon: Home, label: 'Dashboard', active: true, notification: true },
                { icon: BarChart3, label: 'Insights', active: false },
                { icon: FileText, label: 'Reports', active: false },
                { icon: MessageSquare, label: 'Comments', active: false },
                { icon: Globe, label: 'Channels', active: false },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                      item.active
                        ? 'bg-orange-100 text-orange-600 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className={`${!isSidebarOpen && 'hidden'}`}>{item.label}</span>
                    {item.notification && isSidebarOpen && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">1</span>
                    )}
                    {item.notification && !isSidebarOpen && (
                      <span className="bg-red-500 text-white w-3 h-3 rounded-full"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 w-full">
              <LogOut size={20} />
              {isSidebarOpen && <span>Log out</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={22} />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">1</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings size={22} />
              </button>
            </div>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Views</span>
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-gray-800">27.6m</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Followers</span>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-gray-800">219.3k</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Reposts</span>
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-gray-800">1.5k</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-4 rounded-xl text-white">
                <p className="text-sm opacity-90">Upgrade Your Crowd</p>
                <p className="text-lg font-semibold">Pro plan for better results</p>
                <button className="mt-3 bg-white text-red-500 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition">
                  NOW
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Activity</h2>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option>01-07 May</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[20, 28, 22, 35, 30, 38, 32].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-yellow-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${height * 5}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">0{i + 1}</span>
                  </div>
                ))}
                <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-gray-100 px-4 py-2 rounded-lg text-sm">
                  32,210 Views / hour
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Top performers</h2>
              <div className="space-y-4">
                {[
                  { name: 'Valy Antonova', handle: '@valyantonova', percent: 39, img: '1' },
                  { name: 'Mark Noll', handle: '@marknoll', percent: 18, img: '2' },
                  { name: 'Nenci Villy', handle: '@nencivilly', percent: 25, img: '3' },
                ].map((person) => (
                  <div key={person.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.handle}</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-orange-500">{person.percent}%</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-orange-600 hover:text-orange-700 font-medium flex items-center">
                View More <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Channels */}
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Channels</h2>
                <p className="text-sm text-gray-500">Your channels statistics for 1 week period.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Dribbble', handle: '@grantart', change: '+2%', color: 'pink' },
                { name: 'Behance', handle: '@grantart', change: '-7%', color: 'blue', negative: true },
                { name: 'Instagram', handle: '@robertgrant', change: '+4%', color: 'orange' },
                { name: 'Pinterest', handle: '@robertgrant', change: '+2%', color: 'red' },
              ].map((channel) => (
                <div key={channel.name} className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-${channel.color}-500 flex items-center justify-center text-white text-2xl`}>
                    {channel.name[0]}
                  </div>
                  <p className="font-medium">{channel.name}</p>
                  <p className="text-sm text-gray-500">{channel.handle}</p>
                  <p className={`mt-2 font-semibold ${channel.negative ? 'text-red-500' : 'text-green-500'}`}>
                    {channel.change}
                  </p>
                </div>
              ))}
              <button className="bg-teal-100 p-4 rounded-xl flex flex-col items-center justify-center text-teal-600 hover:bg-teal-200 transition">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl mb-2">
                  →
                </div>
                <span className="font-medium">Full Stats</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

              <div className="w-3 h-3 bg-green-500 rounded-full"></div>