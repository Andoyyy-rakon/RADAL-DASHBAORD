import React from 'react'
import StatusChart from '../components/StatusChart'
import TrendChart from '../components/TrendChart'
import LatencyChart from '../components/LatencyChart'
const ChartStat = ({reports}) => {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-1'>
        <StatusChart reports={reports} />
        <TrendChart reports={reports}/>
        <LatencyChart reports={reports} />
    </div>
  )
}

export default ChartStat  