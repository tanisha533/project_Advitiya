import { useState, useEffect } from "react";
import axios from "axios";
import './index.css';
import NgosCarousel from "./components/carousel";
import Navbar from './components/navbar'; 
import Footer from "./components/footer";
import Login from "./components/login";
import HowItWorks from './components/work'
import FoodWasteAwareness from './components/aware'
import SocialImpact from './components/impact'
import Ngosign from './components/ngosign'

function App() {
  const [ngoData, setNgoData] = useState([]);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/ngo/list/");
        setNgoData(response.data);
      } catch (error) {
        console.error("Error fetching NGO data:", error);
      }
    };

    fetchNGOs();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <NgosCarousel />
      <Ngosign />
      <HowItWorks />
      <FoodWasteAwareness />
      <SocialImpact />
      <Footer />

      {/* Display NGO Data */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Registered NGOs</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ngoData.map((ngo) => (
            <div key={ngo.id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900">{ngo.organization}</h3>
              <p className="mt-2 text-gray-600">{ngo.city}, {ngo.state}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Contact: {ngo.phone_number}</p>
                <p className="text-sm text-gray-500">Email: {ngo.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
