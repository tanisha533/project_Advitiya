// import React from 'react';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#f1f5f9] p-8">
//       {/* Header */}
//       <h1 className="text-4xl font-semibold text-gray-800 mb-8">Dashboard</h1>

//       {/* Search Box */}
//       <div className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
//         <div className="w-full sm:w-3/4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">Enter FSL Number</label>
//           <input
//             type="text"
//             placeholder="e.g. FSL001"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button className="w-full sm:w-auto px-6 py-2 bg-[#14532d] text-white font-semibold rounded-md hover:bg-green-900">
//           Search Case
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <p className="text-5xl font-bold text-[#14532d]">24</p>
//           <p className="mt-2 text-gray-700 text-lg font-medium">Total Registered Cases</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <p className="text-5xl font-bold text-[#14532d]">12</p>
//           <p className="mt-2 text-gray-700 text-lg font-medium">Total Transferred Cases</p>
//         </div>
//       </div>

//       {/* Case Table */}
//       <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Case Overview</h2>
//         <table className="w-full table-auto border-collapse text-sm">
//           <thead>
//             <tr className="bg-[#14532d] text-white">
//               <th className="px-4 py-2 border">Case No.</th>
//               <th className="px-4 py-2 border">Case Type</th>
//               <th className="px-4 py-2 border">Station</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="text-gray-700 hover:bg-gray-100">
//               <td className="border px-4 py-2">FSL001</td>
//               <td className="border px-4 py-2">Theft</td>
//               <td className="border px-4 py-2">RJ Nagar</td>
//               <td className="border px-4 py-2 text-green-600 font-semibold">Completed</td>
//               <td className="border px-4 py-2">12/04/2024</td>
//             </tr>
//             <tr className="text-gray-700 hover:bg-gray-100">
//               <td className="border px-4 py-2">FSL002</td>
//               <td className="border px-4 py-2">Homicide</td>
//               <td className="border px-4 py-2">Udaipur PS</td>
//               <td className="border px-4 py-2 text-yellow-600 font-semibold">Pending</td>
//               <td className="border px-4 py-2">15/04/2024</td>
//             </tr>
//             {/* More rows can be added */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
