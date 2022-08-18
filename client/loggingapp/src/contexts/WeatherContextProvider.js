import React, { createContext, useContext, useState, useEffect } from 'react';
import weatherApiService from '../api/weatherApi';
import { useStateContext } from './ContextProvider';

const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
    const { dashInfo } = useStateContext();
    const [weatherData, setWeatherData] = useState(null);
    const [current, setCurrent] = useState(null);
    const [daily, setDaily] = useState(null);
    const [hourly, setHourly] = useState(null);
    const [minutely, setMinutely] = useState(null);


    useEffect(() => {
        if (!dashInfo) {
        }
        else {
            const lat = parseFloat(dashInfo.locations[dashInfo.weatherDefault].lat).toFixed(4);
            const long = parseFloat(dashInfo.locations[dashInfo.weatherDefault].long).toFixed(4);
            if ((!weatherData)) {
                weatherApiService.get(lat, long)
                    .then(json => {
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
            }
            else {
                const weatherLat = parseFloat(weatherData.lat).toFixed(4);
                const weatherLong = parseFloat(weatherData.lon).toFixed(4);
                if (weatherLat !== lat && weatherLong !== long) {
                    weatherApiService.get(lat, long)
                        .then(json => {
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
                }
            }
        }
    }, [dashInfo])

    return (
        <WeatherContext.Provider
            value={{
                weatherData,
                setWeatherData,
                current,
                setCurrent,
                daily,
                setDaily,
                hourly,
                setHourly,
                minutely,
                setMinutely
            }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext);