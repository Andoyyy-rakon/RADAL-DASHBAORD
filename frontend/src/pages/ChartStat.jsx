import React from 'react'
import StatusChart from '../components/StatusChart'
import TrendChart from '../components/TrendChart'
import LatencyChart from '../components/LatencyChart'
const ChartStat = ({reports}) => {
  return (
    <div className=' bg-orange-50 w-full flex justify-around '>
        <StatusChart reports={reports} />
        <TrendChart reports={reports}/>
        <LatencyChart reports={reports} />
    </div>
  )
}

export default ChartStat