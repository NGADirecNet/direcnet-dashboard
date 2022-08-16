import React, { useState, useEffect } from 'react'
import Dropdown from '../Dropdown'
import Button from '../Button'
import { useStateContext } from '../../contexts/ContextProvider'
import { getTestType, timeCalc } from '../../data/dataUtil'
import { useNavigate } from 'react-router-dom'

const RecentWidget = () => {
    const currentMode = 'white'
    const { currentColor, tests } = useStateContext();
    let navigate = useNavigate();
    const [currFilter, setCurrFilter] = useState(1);
    const filterTypes = ['Last Week', 'Last Month', 'All Time'];
    // tests that fit in the selected filterType
    const [filteredTests, setFilteredTests] = useState([])

    useEffect(() => {
        var d = new Date()
        // date to filter by
        const filterDate = currFilter === 0 ? d.setDate(d.getDate() - 7)
            : currFilter === 1 ? d.setMonth(d.getMonth() - 1)
                : new Date('1/1/1969')
        // get our tests in range filterDate to today
        setFilteredTests(
            tests.filter(t => new Date(t.date) > filterDate)
        )
    }, [currFilter, tests])

    // useEffect(() => {
    //     console.log("fil", filteredTests)
    // }, [filteredTests])

    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
            <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold">Recent Tests</p>
                <Dropdown 
                    currentMode={currentMode}
                    onChange={e => setCurrFilter(filterTypes.indexOf(e))}
                    defaultValue={filterTypes[currFilter]}
                    data={filterTypes}
                />
            </div>
            <div className="mt-10 w-72 h-96 md:w-400 overflow-auto">
                {filteredTests && filteredTests.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1).map((item, idx) => {
                    if (idx > 8) return <></>;
                    else {
                        const logo = getTestType(item.type)
                        return (
                            <div key={item.title} className="flex justify-between mt-4 items-center">
                                <div className="flex gap-4 items-center">
                                    <button
                                        type="button"
                                        style={{
                                            color: logo.IconColor,
                                            backgroundColor: logo.IconBg,
                                        }}
                                        className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                                        onClick={() => navigate('/tests/' + item._id)}
                                    >
                                        {logo.Icon}
                                    </button>
                                    <div>
                                        <p className="text-md font-semibold">{item.scenario}</p>
                                        <p className="text-sm text-gray-400">{item.location}</p>
                                    </div>
                                </div>
                                <p className={`text-gray-400 px-2`}>{timeCalc(new Date(item.date))}</p>
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
                        onClick={() => navigate('/tests/new')}
                    />
                </div>

                <p className="text-gray-400 text-sm">{filteredTests.length} Test{filteredTests.length > 1 && 's'} {filterTypes[currFilter]}</p>
            </div>
        </div>
    )
}

export default RecentWidget