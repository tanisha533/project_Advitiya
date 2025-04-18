// import{useState, useEffect} from "react";
// import axios from "axios";
// import './App.css';

// function App() {
//   const[farmer, setFarmer] = useState([])
//   useEffect(() => {
//     async function getAllFarmer() {
//       try {
//         const farmer = await axios.get("http://127.0.0.1:8000/api/farmer/");
//         console.log(farmer.data);
//         setFarmer(farmer.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
  
//     getAllFarmer();
//   }, []);
  
//   return (
//     <div className="App">
//       <h1>trying to connect react with django</h1>
//       {
//         farmer.map((farmer, i)=>{
//           return(
//             <h4 key={i}>{farmer.name} {farmer.email}</h4>
//           )
//         })
//       }
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import axios from "axios";
// import ngosign from './components/ngosign';
import Ngosign from "./components/ngosign";
// import './App.css';
import './index.css';
import NgosCarousel from "./components/carousel";
// import MyForm from './components/myform'; // ✅ Import your form component
import Navbar from './components/navbar'; 
import Footer from "./components/footer";
import Login from "./components/login";
import HowItWorks from './components/work'
import FoodWasteAwareness from './components/aware'
import SocialImpact from './components/impact'
// import NGODashboard from './components/dashboard'
// import FarmerSurplus from './components/farfood'
function App() {
  // const [farmer, setFarmer] = useState([]);

  // useEffect(() => {
  //   async function getAllFarmer() {
  //     try {
  //       const response = await axios.get("http://127.0.0.1:8000/api/farmer/");
  //       console.log(response.data);
  //       setFarmer(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   getAllFarmer();
  // }, []);

  return (
    <div className="App">
      <Navbar />
      <NgosCarousel />
    
      {/* <h1>Trying to connect React with Django</h1> */}

      {/* 🧾 Display farmers fetched from Django */}
      {/* {
        farmer.map((farmer, i) => (
          <h4 key={i}>{farmer.name} {farmer.email}</h4>
        ))
      } */}

      <hr />

      {/* 📬 Form to submit new data to Django */}
      {/* <h2>Submit Contact Form</h2> */}
      {/* <MyForm /> */}
      <carousel />
      {/* <FarmerSurplus /> */}
      <HowItWorks />
      <FoodWasteAwareness />
      <SocialImpact />
      {/* <NGODashboard /> */}
      {/* <Login/> */}
      <Footer />
    </div>
  );
}

export default App;
