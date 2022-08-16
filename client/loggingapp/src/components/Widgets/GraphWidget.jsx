import React from 'react'
import Dropdown from '../Dropdown'
import LineChart from '../Charts/LineChart'
import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const GraphWidget = () => {
    const currentMode = 'white'
    const { progress } = useStateContext();

    const progressSeries = progress.map(branch => {
        return {
            dataSource: branch,
            xName: 'x',
            yName: 'y',
            name: 'branch',
            width: '2',
            marker: { visible: true, width: 10, height: 10 },
            type: 'Line'
        }
    })

    const x = {
        valueType: 'DateTime',
        labelFormat: 'y',
        intervalType: 'Months',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        background: 'white',
    };

    const y = {
        labelFormat: '{value}',
        rangePadding: 'None',
        minimum: 0,
        maximum: 20,
        interval: 5,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
    };

    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
            <div className="flex justify-between items-center gap-2 mb-10">
                <p className="text-xl font-semibold">Stability Overview</p>
                <Dropdown currentMode={currentMode} />
            </div>
            <div className="md:w-full overflow-auto">
                <LineChart
                    series={progress && progressSeries}
                    xAxis={x}
                    yAxis={y}
                />
            </div>
        </div>
    )
}

export default GraphWidget