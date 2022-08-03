import React from 'react'
import Dropdown from '../Dropdown'
import LineChart from '../Charts/LineChart'
import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';

const GraphWidget = () => {
    const currentMode='white'
    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
            <div className="flex justify-between items-center gap-2 mb-10">
                <p className="text-xl font-semibold">Stability Overview</p>
                <Dropdown currentMode={currentMode} />
            </div>
            <div className="md:w-full overflow-auto">
                <LineChart 
                    series={lineCustomSeries} 
                    xAxis={LinePrimaryXAxis}
                    yAxis={LinePrimaryYAxis}
                />
            </div>
        </div>
    )
}

export default GraphWidget