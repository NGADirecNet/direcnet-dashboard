import React, { createContext, useContext, useState, useEffect } from 'react';
import testApiService from '../testApi';
import calendarApiService from '../calendarApi';

const StateContext = createContext();

// const initialState = {
// }

// filter by date key val pair and return object
// with the most recent date
const getMostRecent = (objArray=[]) => {
    if (objArray.length === 0) return {}
    return objArray.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b)
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState('#0d3d4b')
    const [tests, setTests] = useState([])
    const [currentDemo, setCurrentDemo] = useState({})
    const [cal, setCal] = useState([])

    useEffect(() => {
        testApiService.get()
            .then(json => {
                setTests(json)
                setCurrentDemo(getMostRecent(json.filter(obj => obj.demo === true)))
            })
        
        calendarApiService.get()
            .then(json => {
                setCal(json)
            })
    }, [])

    // useEffect(() => {
    //     console.log("tests updated, ", tests)
    // }, [tests])

    // useEffect(() => {
    //     console.log("cal updated", cal)
    // }, [cal])
    
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
                setCal
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);