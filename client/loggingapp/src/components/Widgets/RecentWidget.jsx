import React from 'react'
import Dropdown from '../Dropdown'
import { recentTransactions } from '../../data/dummy'
import Button from '../Button'
import { useStateContext } from '../../contexts/ContextProvider'
import { timeCalc } from '../../data/dataUtil'
import { useNavigate } from 'react-router-dom'
import { outdoorLogo, indoorLogo, emaneLogo } from '../../data/dashLogos'

const RecentWidget = () => {
    const currentMode = 'white'
    const { currentColor, tests } = useStateContext();
    let navigate = useNavigate();
    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
            <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold">Recent Tests</p>
                <Dropdown currentMode={currentMode} />
            </div>
            <div className="mt-10 w-72 md:w-400">
                {tests.map((item, idx) => {
                    if (idx > 4) return <></>;
                    else {
                        const logo = item.type === 'outdoor' ? { ...outdoorLogo }
                            : item.type === 'indoor' ? { ...indoorLogo }
                                : { ...emaneLogo }
                        return (
                            <div key={item.title} className="flex justify-between mt-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        style={{
                                            color: logo.IconColor,
                                            backgroundColor: logo.IconBg,
                                        }}
                                        className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                                        onClick={() => navigate('/test/' + item._id)}
                                    >
                                        {logo.Icon}
                                    </button>
                                    <div>
                                        <p className="text-md font-semibold">{logo.Type}</p>
                                        <p className="text-sm text-gray-400">{item.location}</p>
                                    </div>
                                </div>
                                <p className={`text-${item.pcColor}`}>{timeCalc(new Date(item.date))}</p>
                            </div>
                        )
                    }
                }
                )}
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                <div className="mt-3">
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Add"
                        borderRadius="10px"
                        onClick={() => navigate('/test/new')}
                    />
                </div>

                <p className="text-gray-400 text-sm">{tests.length} Recent Tests</p>
            </div>
        </div>
    )
}

export default RecentWidget