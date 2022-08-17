import React, { createContext, useContext, useState, useEffect } from 'react';
import testApiService from '../testApi';
import calendarApiService from '../calendarApi';
import atlassianApiService from '../atlassianApi';
import mapsApiService from '../mapsApi';
import dashApiService from '../dashApi';

const StateContext = createContext();

// const initialState = {
// }

// filter by date key val pair and return object
// with the most recent date
const getMostRecent = (testsArr = []) => {
    if (testsArr.length === 0) return {}
    return testsArr
        .filter(test => test.type === 'demo')
        .reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b)
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState('#0d3d4b')
    const [tests, setTests] = useState([])
    const [currentDemo, setCurrentDemo] = useState({})
    const [cal, setCal] = useState([])
    const [branches, setBranches] = useState([]);
    const [sceneMaps, setSceneMaps] = useState([]);
    const [progress, setProgress] = useState([]);
    const [dashInfo, setDashInfo] = useState(null);

    useEffect(() => {
        testApiService.get()
            .then(json => {
                if (!json.message) {
                    setTests(json)
                    setCurrentDemo(getMostRecent(json))
                }
            })

        calendarApiService.get()
            .then(json => {
                if (!json.message)
                    setCal(json)
            })
        atlassianApiService.get()
            .then(json => {
                if (json) {
                    setBranches(json.values)
                }
            })
        mapsApiService.get()
            .then(json => {
                if (json) {
                    setSceneMaps(json);
                }
            })
        atlassianApiService.getProgress()
            .then(json => {
                if (json) {
                    setProgress(json.commits)
                }
            })
        dashApiService.get()
            .then(json => {
                if (json) {
                    setDashInfo(json[0])
                }
            })
    }, [])

    // useEffect(() => {
    //     console.log("tests updated, ", tests)
    // }, [tests])

    // useEffect(() => {
    //     console.log("cal updated", cal)
    // }, [cal])

    // useEffect(() => {
    //     console.log("current demo updated - ", currentDemo)
    // }, [currentDemo])

    // useEffect(() => {
    //     console.log("PROGRESS updated", progress)
    // }, [progress])

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                screenSize,
                setScreenSize,
                currentColor,
                tests,
                setTests,
                currentDemo,
                setCurrentDemo,
                cal,
                setCal,
                branches,
                setBranches,
                sceneMaps,
                setSceneMaps,
                progress,
                setProgress,
                dashInfo,
                setDashInfo
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);