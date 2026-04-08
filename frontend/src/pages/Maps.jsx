// import React from 'react'

// const Maps = () => {
//   return (
//     <div className='bg-orange-50 w-1/2'>
//       <div className="space-y-8">

//   {/* 1️⃣ Dashboard Overview */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//     <div className="bg-white p-5 rounded-2xl shadow-md">
//       <p className="text-gray-500 text-sm">Total Households</p>
//       <p className="text-3xl font-bold text-gray-800">{stats.totalHouseholds}</p>
//     </div>

//     <div className="bg-white p-5 rounded-2xl shadow-md">
//       <p className="text-gray-500 text-sm">Total Members</p>
//       <p className="text-3xl font-bold text-gray-800">{stats.totalMembers}</p>
//     </div>

//     <div className="bg-white p-5 rounded-2xl shadow-md">
//       <p className="text-gray-500 text-sm">Avg Members / Family</p>
//       <p className="text-3xl font-bold text-gray-800">{stats.averageMembers}</p>
//     </div>

//     <div className="bg-white p-5 rounded-2xl shadow-md">
//       <p className="text-gray-500 text-sm">Largest Family</p>
//       <p className="text-lg font-bold text-gray-800">
//         {stats.largestFamily ? `${stats.largestFamily.family_name} (${stats.largestFamily.quantity})` : "—"}
//       </p>
//     </div>
//   </div>

//   {/* 2️⃣ Search + Filter */}
//   <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
//     <input
//       type="text"
//       placeholder="Search family name..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       className="w-full md:w-72 px-4 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
//     />

//     <select
//       value={memberFilter}
//       onChange={(e) => setMemberFilter(e.target.value)}
//       className="px-4 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
//     >
//       <option value="ALL">All Members</option>
//       <option value="SMALL">Small (1–3)</option>
//       <option value="MEDIUM">Medium (4–6)</option>
//       <option value="LARGE">Large (7–10)</option>
//       <option value="VERY_LARGE">Very Large (10+)</option>
//     </select>
//   </div>

//   {/* 3️⃣ Household Grid */}
//   {filteredData.length === 0 ? (
//     <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
//       No household records found.
//     </div>
//   ) : (
//     <div className="grid grid-cols-2 gap-x-12 gap-y-12 ">
//       {filteredData.map((item) => (
//         <div className='pt-12 pb-10 relative transition-all duration-300'  key={item._id}>
//         <Familyinfo
//           key={item._id}
//           {...item}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//         </div>
//       ))}
//     </div>
//   )}
// </div>
//     </div>
//   )
// }

// export default Maps