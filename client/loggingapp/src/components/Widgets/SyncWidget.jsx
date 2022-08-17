import React from 'react'
import { IoIosMore } from 'react-icons/io';
import SyncPane from './SyncPane';

const weeklyStats = [
    {
      amount: 'Complete',
      title: 'DNET-313',
      desc: 'Anthony',
      iconBg: '#0d3d4b',
      pcColor: 'green-600',
    },
    {
      amount: 'In Progress',
      title: 'DNET-323',
      desc: 'Andrew',
      iconBg: '#0d3d4b',
      pcColor: 'green-600',
    },
    {
      amount: 'Complete',
      title: 'DNET-296',
      desc: 'Joe',
      iconBg: '#0d3d4b',
      pcColor: 'green-600',
    },
    {
      amount: 'In Progress',
      title: 'DNET-301',
      desc: 'Lucas',
      iconBg: '#0d3d4b',
      pcColor: 'green-600',
    },
    {
      amount: 'Ready for Testing',
      title: 'DNET-319',
      desc: 'Corey',
      iconBg: '#0d3d4b',
      pcColor: 'green-600',
    },
];

const SyncWidget = () => {

    return (
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Weekly Sync</p>
                <button
                    type="button"
                    className="text-xl font-semibold text-gray-500"
                    onClick={() => window.open('https://cuse-atlassian.alionscience.com:8443/secure/RapidBoard.jspa?projectKey=DNET&rapidView=92')}
                >
                    <IoIosMore />
                </button>
            </div>

            <div className="mt-6 h-400 overflow-auto p-1">
                {weeklyStats.map((item) => (
                    <SyncPane item={item} />
                ))}
            </div>
        </div>
    )
}

export default SyncWidget;