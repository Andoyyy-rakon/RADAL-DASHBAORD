import React from 'react'
import Maps from './Maps'
import MessagePanel from './MessagePanel'
const Dashboard = () => {
  return (
    <div className='flex-1 pl-[70px] flex '>
        <MessagePanel/>
        <Maps/>
    </div>
  )
}

export default Dashboard