// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DonorDashboard = () => {
//   const [foodListings, setFoodListings] = useState([]);
//   const [error, setError] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     address: '',
//     foodType: '',
//     quantity: '',
//     expiryDate: '',
//   });
//   const [location, setLocation] = useState(null);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchFoodListings();
//   }, []);

//   const fetchFoodListings = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/food-listings/');
//       setFoodListings(response.data);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setError('Failed to load food listings.');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const requestLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLocation({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//       },
//       (err) => {
//         setMessage('Location access denied.');
//         console.error(err);
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!location) {
//       setMessage('Please allow location access first.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:8000/api/submit-food/', {
//         ...formData,
//         latitude: location.lat,
//         longitude: location.lng,
//       });
//       setMessage('Food listing submitted successfully!');
//       setFormData({ address: '', foodType: '', quantity: '', expiryDate: '' });
//       fetchFoodListings();
//       setShowForm(false);
//     } catch (error) {
//       console.error('Submit error:', error);
//       setMessage('Submission failed.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Your Food Listings</h2>
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {showForm ? 'View Listings' : 'Add New Listing'}
//           </button>
//         </div>

//         {showForm ? (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold mb-4 text-gray-800">List Food for Donation</h3>

//             <button
//               onClick={requestLocation}
//               className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
//             >
//               Allow Location Access
//             </button>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="foodType"
//                 placeholder="Food Type"
//                 value={formData.foodType}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="quantity"
//                 placeholder="Quantity (e.g. 20kg)"
//                 value={formData.quantity}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="date"
//                 name="expiryDate"
//                 value={formData.expiryDate}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               >
//                 Submit
//               </button>
//               {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
//             </form>
//           </div>
//         ) : (
//           <>
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                 {error}
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {foodListings.map((food) => (
//                 <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">{food.foodType}</h3>
//                     <div className="space-y-2">
//                       <p className="text-gray-600">
//                         <span className="font-medium">Quantity:</span> {food.quantity}
//                       </p>
//                       <p className="text-gray-600">
//                         <span className="font-medium">Expiry Date:</span>{' '}
//                         {new Date(food.expiryDate).toLocaleDateString()}
//                       </p>
//                       <p className="text-gray-600">
//                         <span className="font-medium">Address:</span> {food.address}
//                       </p>
//                     </div>
//                     <div className="mt-4 pt-4 border-t border-gray-200">
//                       <p className="text-sm text-gray-500">
//                         Location: {food.latitude.toFixed(6)}, {food.longitude.toFixed(6)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {foodListings.length === 0 && !error && (
//               <div className="text-center py-12">
//                 <p className="text-gray-600">No food listings available.</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [foodListings, setFoodListings] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchFoodListings();
  }, []);

  const fetchFoodListings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/food-listings/');
      if (response.data && Array.isArray(response.data)) {
        setFoodListings(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setFoodListings([]);
      }
    } catch (error) {
      console.error('Error fetching food listings:', error);
      setFoodListings([]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleClaimFood = async (listingId) => {
    try {
      await axios.post(`http://localhost:8000/api/claim-food/${listingId}`);
      fetchFoodListings(); // Refresh the listings
    } catch (error) {
      console.error('Error claiming food:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Food Listings</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab('available')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'available'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Available Food
            </button>
            <button
              onClick={() => setActiveTab('claimed')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'claimed'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Claimed Food
            </button>
          </div>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodListings.length > 0 ? (
            foodListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {listing.foodType}
                    </h3>
                    <p className="text-sm text-gray-500">{listing.quantity}</p>
                  </div>
                  <span className="text-sm text-gray-500">Expires: {new Date(listing.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Location:</span> {listing.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Distance:</span> {listing.distance || 'Calculating...'}
                  </p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Map
                  </button>
                  <button 
                    onClick={() => handleClaimFood(listing.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Claim Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No food listings available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;