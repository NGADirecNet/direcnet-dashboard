import React from 'react'
import Dropdown from '../Dropdown'
import LineChart from '../Charts/LineChart'
import { useStateContext } from '../../contexts/ContextProvider';

const GraphWidget = () => {
    const currentMode = 'white'
    const { progress } = useStateContext();

    // const progressSeries = progress.map(branch => {
    //     return {
    //         dataSource: branch.values,
    //         xName: 'authorTimestamp',
    //         yName: '0',
    //         name: branch.branch,
    //         width: '2',
    //         marker: { visible: true, width: 10, height: 10 },
    //         type: 'Line'
    //     }
    // })

    const x = {
        valueType: 'DateTime',
        labelFormat: 'MMM d y',
        intervalType: 'Months',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        background: 'white',
    };

    const y = {
        labelFormat: '{value}',
        rangePadding: 'None',
        minimum: 0,
        // maximum: 20,
        interval: 1,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
    };

    const aggregate = progress.map(branch => {
        const re = branch.values.reduce((groups, commit) => {
            const date = new Date(commit.authorTimestamp).toISOString().split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(commit);
            return groups;
        }, {})

        return {
            branch: branch.branch,
            dates: Object.keys(re).map(date => { return { date, numCommits: re[date].length } })
        }
    })

    const progressSeries = aggregate.map(branch => {
        return {
            dataSource: branch.dates,
            xName: 'date',
            yName: 'numCommits',
            name: branch.branch,
            width: '2',
            marker: { visible: true, width: 10, height: 10 },
            type: 'Line'
        }
    })

    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
            <div className="flex justify-between items-center gap-2 mb-10">
                <p className="text-xl font-semibold">Stability Overview</p>
                <Dropdown currentMode={currentMode} />
            </div>
            <div className="md:w-full overflow-auto">
                <LineChart
                    series={aggregate && progressSeries}
                    xAxis={x}
                    yAxis={y}
                    tooltip={{
                        enable: true,
                        format: '${point.x} : <b>${point.y}</b>'
                    }}
                />
            </div>
        </div>
    )
}

export default GraphWidget