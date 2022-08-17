import React from 'react'
import { IoIosMore } from 'react-icons/io';
import { useStateContext } from '../../contexts/ContextProvider';
import dashApiService from '../../api/dashApi';
import AddButton from '../AddButton';
import SyncPane from './SyncPane';

const SyncWidget = () => {

    const { dashInfo, setDashInfo } = useStateContext();

    const addItem = () => {
        const newDashInfo = {
            ...dashInfo, 
            sync: [...dashInfo.sync, {
                title: "New Work Item",
                assignees: ["Assignee 1", "Assignee 2"],
                status: "Backlog",
                link: ''
            }]
        }
        setDashInfo(newDashInfo);
        dashApiService.update(newDashInfo);
    }

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
                {dashInfo && dashInfo.sync.map((item, idx) => (
                    <SyncPane key={idx} item={item} itemIdx={idx} />
                ))}
            </div>
            <div>
                <AddButton onClick={addItem} />
            </div>
        </div>
    )
}

export default SyncWidget;