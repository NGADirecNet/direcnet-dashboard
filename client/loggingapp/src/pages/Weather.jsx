import React, { useEffect } from 'react'
import { Page } from '../components'
import { BsSun } from 'react-icons/bs'
import { days } from '../data/contants'
import { apiIcon } from '../data/weatherUtil'
import { useWeatherContext } from '../contexts/WeatherContextProvider'

const Weather = () => {
    const { weatherData, current, hourly, daily } = useWeatherContext();

    // https://openweathermap.org/api/one-call-3

    // https://openweathermap.org/weather-conditions#How-to-get-icon-URL

    const getWeatherIcon = (iconId) => {
        return apiIcon.find(i => i.name === iconId.slice(0, 2)).icon
    }

    // convert weather api unix utc time to Date object
    const unixToDate = (dt) => {
        // time zone offset is -14400
        // 1000 converts to milliseconds input
        return new Date((dt) * 1000)
    }

    return (
        <Page headerCat="App" headerTitle="Weather">
            <div className='flex gap-2'>
                {/* <button
          style={{ color: "rgb(254, 201, 15)" }}
          className="text-4xl drop-shadow-xl align-middle"
        >
          <BsSun />
        </button> */}
                {(weatherData && current && hourly && daily) &&
                    <div className='w-full'>
                        <div className='font-semibold text-2xl'>
                            {days[new Date().getDay()]}
                        </div>
                        <p className='text-gray-400'>
                            {new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <div className='flex p-5 gap-5'>
                            <div className='border-1 rounded-lg'>
                                Current
                                <p className='p-1'>{unixToDate(current.dt).toLocaleTimeString()}</p>
                                <p className='p-1'>{current.weather[0].main}</p>
                                <p className='p-1'>{current.weather[0].description}</p>
                                {getWeatherIcon(current.weather[0].icon)}
                            </div>
                            <div className='border-1 rounded-lg w-full h-60 overflow-auto'>
                                Hourly
                                {hourly.map(h =>
                                    <div>
                                        {unixToDate(h.dt).toLocaleTimeString()}
                                        {getWeatherIcon(h.weather[0].icon)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            Daily
                            <div className='flex gap-1'>
                                {daily.map(d =>
                                    <div className='p-3 border-1 rounded-lg w-full'>
                                        {unixToDate(d.dt).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>}
            </div>
        </Page>
    )
}

export default Weather