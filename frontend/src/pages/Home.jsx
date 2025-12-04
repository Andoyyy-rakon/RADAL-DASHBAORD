import React from 'react'
import { assets } from '../assets/asset'
import Dashboard from './Dashboard'
import Sidebar from '../components/Sidebar'
const Home = () => {
  return (
    <div className='min-h-screen flex flex-row '>
        <Sidebar/>
        <Dashboard/>
    </div>

  )
}

export default Home