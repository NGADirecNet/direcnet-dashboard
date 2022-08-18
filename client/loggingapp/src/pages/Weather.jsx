import React from 'react'
import { Compass, HourlyChart, Humidity, Page, PrecipitaionBar, UVGauge } from '../components'
import { days } from '../data/contants'
import { apiIcon } from '../data/weatherUtil'
import { useWeatherContext } from '../contexts/WeatherContextProvider'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { WiSunrise, WiSunset } from 'react-icons/wi'
import { useStateContext } from '../contexts/ContextProvider'

const Weather = () => {
    const { weatherData, current, hourly, daily } = useWeatherContext();
    const { currentColor, dashInfo } = useStateContext();

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

    const getUVRange = (uv) => {
        if (uv < 2) return { text: 'Low', color: 'green' }
        else if (uv < 5) return { text: 'Moderate', color: 'yellow' }
        else if (uv < 7) return { text: 'High', color: 'orange' }
        else if (uv < 10) return { text: 'Very High', color: 'red' }
        else return { text: 'Extreme', color: 'purple' }
    }

    const getHumidity = (h) => {
        if (h < 30) return { text: 'Uncomfortably Dry', color: 'yellow' }
        else if (h < 60) return { text: 'Comfortable', color: 'lime' }
        else return { text: 'Uncomfortably Humid', color: 'cyan' }
    }

    return (
        <Page headerCat="App" headerTitle="Weather">
            <div className='flex gap-2'>
                {(weatherData && current && hourly && daily) &&
                    <>
                        <div className='flex w-full gap-2 flex-wrap lg:flex-nowrap justify-center'>
                            <div className='w-full lg:w-2/3'>
                                <div className='flex p-4 border-1 rounded-lg h-72 shadow-md gap-2'>
                                    <div className='w-1/2'>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-2'>
                                                <p className='text-2xl'>
                                                    <HiOutlineLocationMarker />
                                                </p>
                                                <p className='font-semibold'>{dashInfo.locations[dashInfo.weatherDefault].name}</p>
                                            </div>
                                            <div>
                                                <p className='mx-1 text-gray-400'>{unixToDate(current.dt).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</p>
                                            </div>
                                        </div>
                                        <div className='h-48 items-center p-3'>
                                            <p className='font-semibold text-7xl text-center' style={{ color: currentColor }}>{current.temp.toString().slice(0, 2) + '°'}</p>
                                            <p className='text-gray-400 text-lg text-center'>{current.weather[0].main}</p>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            {/* Footer */}
                                            <div className='flex gap-2 items-center'>
                                                {/* Sunrise */}
                                                <p className='text-2xl'><WiSunrise /></p>
                                                <p>{unixToDate(current.sunrise).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</p>
                                            </div>
                                            <div>
                                                {/* Todays date */}
                                                {unixToDate(current.dt).toLocaleDateString([], {month: 'long', day: 'numeric', year: 'numeric'})}
                                            </div>
                                            <div className='flex items-center'>
                                                {/* Sunset */}
                                                <p className='text-2xl'><WiSunset /></p>
                                                <p>{unixToDate(current.sunset).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-1/2 h-72'>
                                        <HourlyChart />
                                    </div>
                                </div>
                                <div className='mt-2 grid grid-rows-2 grid-flow-col gap-2'>
                                    <div className='flex p-4 border-1 rounded-lg shadow-md'>
                                        <div className='w-1/2 h-36'>
                                            <p className='mx-1 py-2 font-semibold'>Precipitation</p>
                                            <p className='mx-1 py-2 text-gray-400'>Chance of Rain</p>
                                            <p className='mx-1 py-2'>Today</p>
                                        </div>
                                        <div className='w-1/2 h-36'>
                                            <PrecipitaionBar />
                                        </div>
                                    </div>
                                    <div className='flex p-4 border-1 rounded-lg shadow-md'>
                                        <div className='w-1/2 h-36'>
                                            <p className='mx-1 py-2 font-semibold'>Humidity</p>
                                            <p className={`mx-1 py-2 font-bold text-${getHumidity(current.humidity).color}-600`}>
                                                {getHumidity(current.humidity).text}
                                            </p>
                                            <p className='mx-1 py-2'>{current.humidity + '%'}</p>
                                        </div>
                                        <div className='w-1/2 h-36'>
                                            <Humidity />
                                        </div>
                                    </div>
                                    <div className='flex p-4 border-1 rounded-lg shadow-md'>
                                        <div className='w-1/2 h-36'>
                                            <p className='mx-1 py-2 font-semibold'>Wind</p>
                                            <p className='mx-1 py-2 text-gray-400'>Wind Speed</p>
                                            <p className='mx-1 py-2'>{current.wind_speed}</p>
                                        </div>
                                        <div className='w-1/2 h-36'>
                                            <Compass />
                                        </div>
                                    </div>
                                    <div className='flex p-4 border-1 rounded-lg shadow-md'>
                                        <div className='w-1/2 h-36'>
                                            <p className='mx-1 py-2 font-semibold'>UV Index</p>
                                            <p className={`mx-1 py-2 font-bold text-${getUVRange(current.uvi).color}-600`}>
                                                {getUVRange(current.uvi).text}
                                            </p>
                                            <p className='mx-1 py-2'>{current.uvi}</p>
                                        </div>
                                        <div className='w-1/2 h-36'>
                                            <UVGauge />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full lg:w-1/3 p-4 border-1 rounded-lg shadow-md'>
                                {daily.map((d, i) => {
                                    // exclude today
                                    if (i === 0) return <></>
                                    const day = unixToDate(d.dt);
                                    return (
                                        <div className='flex items-center py-4 m-2 justify-between'>
                                            <div className='w-24'>
                                                <p className='font-semibold py-1'>{days[day.getUTCDay()]}</p>
                                                <p className='text-gray-400'>{day.getDate()} {day.toLocaleString('default', { month: 'long' }).slice(0, 3)}</p>
                                            </div>
                                            <div>
                                                <p className='font-bold'>{d.temp.day.toString().slice(0, 2) + '°'}</p>
                                            </div>
                                            <div>
                                                <p className='text-2xl'>{getWeatherIcon(d.weather[0].icon)}</p>
                                            </div>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </>}
            </div>
        </Page >
    )
}

export default Weather