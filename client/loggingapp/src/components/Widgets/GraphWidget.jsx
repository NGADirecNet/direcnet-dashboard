import React from 'react'
import LineChart from '../Charts/LineChart'
import { useStateContext } from '../../contexts/ContextProvider';
import { IoIosMore } from 'react-icons/io';

const GraphWidget = () => {
    const { progress } = useStateContext();

    const x = {
        title: "Time",
        valueType: 'DateTime',
        labelFormat: 'MMM d y',
        intervalType: 'Months',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        background: 'white',
    };

    const y = {
        title: "Number of Commits",
        labelFormat: '{value}',
        rangePadding: 'None',
        minimum: 0,
        // maximum: 20,
        interval: 1,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
    };

    const aggregate = progress && progress.map(branch => {
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

    const progressSeries = aggregate && aggregate.map(branch => {
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
                <p className="text-xl font-semibold">Git Overview</p>
                <button
                    type="button"
                    className="text-xl font-semibold text-gray-500"
                    onClick={() => window.open('https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/branches')}
                >
                    <IoIosMore />
                </button>
            </div>
            <div className="md:w-full overflow-auto">
                <LineChart
                    series={aggregate && progressSeries}
                    xAxis={x}
                    yAxis={y}
                    tooltip={{
                        enable: true,
                        format: '${point.x} : <b>${point.y}</b> commits'
                    }}
                />
            </div>
        </div>
    )
}

export default GraphWidget