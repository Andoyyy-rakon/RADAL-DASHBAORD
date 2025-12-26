import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import { UserContext } from "./usercontext/UserContext"
import { useState } from "react"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Acknowledge from "./pages/Acknowledge"
import Familyrecords from "./pages/Familyrecords"


export default function App() {

    const [data,setdata]=useState([]);

  


  return (
    <div className='min-h-screen flex flex-row '>
      <UserContext.Provider value={{data,setdata}}>
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