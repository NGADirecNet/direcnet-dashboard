import React, { createContext, useContext, useState, useEffect } from 'react';
import weatherApiService from '../api/weatherApi';

const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {

    const [weatherData, setWeatherData] = useState(null);
    const [current, setCurrent] = useState(null);
    const [daily, setDaily] = useState(null);
    const [hourly, setHourly] = useState(null);
    const [minutely, setMinutely] = useState(null);


    useEffect(() => {

        weatherApiService.get()
            .then(json => {
                console.log("JSON", json);
                setWeatherData(json);
                if (json.current)
                    setCurrent(json.current);
                if (json.daily)
                    setDaily(json.daily);
                if (json.hourly)
                    setHourly(json.hourly);
                if (json.minutely)
                    setMinutely(json.minutely);
            })
    }, [])

    return (
        <WeatherContext.Provider
            value={{
                weatherData,
                setWeatherData,
                current,
                daily,
                hourly,
                minutely
            }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext);