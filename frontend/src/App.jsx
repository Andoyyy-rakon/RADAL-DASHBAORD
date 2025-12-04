import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import { UserContext } from "./usercontext/UserContext"
import { useState } from "react"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Acknowledge from "./pages/Acknowledge"
import Familyrecords from "./pages/Familyrecords"


export default function App() {

  const [reports, setReports] = useState([
  {
    device_id: 123474,
    family_info: "Dela Cruz",
    quantity: 5,
    warning_message: "Immediate rescue needed! Household is in danger.",
    location: "Brgy 1, in front of Supermart, the building with a red roof",
    gnss: "122334 x 232344",
    time: "2025-12-01 14:35:20"
  },
  {
    device_id: 987221,
    family_info: "Garcia",
    quantity: 4,
    warning_message: "Need immediate rescue due to typhoon/flood",
    location: "Zone 5, beside the community center, near the blue house",
    gnss: "119200 x 228900",
    time: "2025-12-01 14:37:10"
  },
  {
    device_id: 556890,
    family_info: "Reyes",
    quantity: 3,
    warning_message: "Need immediate rescue due to typhoon/flood",
    location: "Brgy 2, next to City Hall, the yellow house",
    gnss: "120124 x 230455",
    time: "2025-12-01 14:40:05"
  },
  {
    device_id: 772341,
    family_info: "Lopez",
    quantity: 6,
    warning_message: "Need immediate rescue due to typhoon/flood",
    location: "Highway 12, near the gas station, opposite the green building",
    gnss: "121300 x 229880",
    time: "2025-12-01 14:42:30"
  },
  {
    device_id: 334120,
    family_info: "Santos",
    quantity: 5,
    warning_message: "Need immediate rescue due to typhoon/flood",
    location: "Brgy 3, across the school, beside the tall mango tree",
    gnss: "123900 x 231200",
    time: "2025-12-01 14:45:50"
  }
]);


  return (
    <div className='min-h-screen flex flex-row '>
      <UserContext.Provider value={{reports,setReports}}>
        <BrowserRouter>
        <Sidebar/>

        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="acknowledge" element={<Acknowledge/>}/>
            <Route path="records" element={<Familyrecords/>}/>
        </Routes>

        
        
        </BrowserRouter>
      </UserContext.Provider>
        
    </div>


  )
}