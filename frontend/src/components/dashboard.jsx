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