import React from 'react'
import { IoIosMore } from 'react-icons/io'
import { BsCloudSun, BsCalendar3, BsCloudRainHeavy, BsCloudRain, BsSun } from 'react-icons/bs'
import { TbPlayerTrackNext } from 'react-icons/tb'
import { AiOutlineCloud, } from 'react-icons/ai'
import { useWeatherContext } from '../../contexts/WeatherContextProvider'
import { apiIcon } from '../../data/weatherUtil'
import { days } from '../../data/contants'
import { useStateContext } from '../../contexts/ContextProvider'
import { WiHot, WiHumidity } from 'react-icons/wi'

const WeatherWidget = () => {
    const { dashInfo } = useStateContext();
    const { daily, current, hourly } = useWeatherContext();

    console.log("daily", daily)

    /**
     * Returns frequently used circular icon button
     * @param {*} color - icon color
     * @param {*} background - circular background color
     * @param {*} icon - icon component to be displayed
     * @returns - styled circular icon
     */
    const getButtonIcon = (color, background, icon) => {
        return (
            <button
                type="button"
                style={{
                    color: color,
                    background: background
                }}
                className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
            >
                {icon}
            </button>
        )
    }

    /**
     * Returns circular icon with text below
     * @param {*} color - icon color
     * @param {*} background - circular bg color
     * @param {*} icon - icon component
     * @param {*} text - text to be displayed
     * @returns - icon and text component display
     */
    const getDay = (color, background, icon, text) => {

        return (
            <div>
                {getButtonIcon(color, background, icon)}
                <p className='text-sm text-center font-semibold'>{text}</p>
            </div>
        )
    }

    const getWeeklyDay = (day, color, background, icon, text) => {
        const suitable = '#8BE78B';
        const questionable = '#FEC90F';
        const unsuitable = 'rgb(228, 106, 118)';
        let c = suitable;
        if (day.clouds > 75) c = questionable;
        if (day.weather[0].description.includes('light')) c = questionable;
        if (day.pop > .3) c = unsuitable;
        if (day.weather[0].description.includes('thunderstorm')) c = unsuitable;
        return (
            <div>
                {getButtonIcon(color, background, icon)}
                <div className='flex gap-1 items-center'>
                    <p style={{ background: c }} className="rounded-full h-2 w-2" />
                    <p className='text-sm text-center font-semibold'>{text}</p>
                </div>
            </div>
        )
    }

    // determines the status message in widget
    // utilizes a mix of hourly and daily stats to determine if the testing location
    // is good to go or not
    const getStatus = () => {
        const suitable = { text: 'Suitable', color: '#8BE78B' };
        const questionable = { text: 'Questionable', color: '#FEC90F' };
        const unsuitable = { text: 'Unsuitable', color: 'rgb(228, 106, 118)' };
        let status = { ...suitable };
        if (daily && daily.length && hourly && hourly.length) {
            const avg = hourly => hourly.map(h => h.pop).reduce((a, b) => a + b) / hourly.length
            const average = avg(hourly.filter((h, i) => i < 6))
            const max = Math.max(...hourly.filter((h, i) => i < 6).map(h => h.pop));
            const maxWind = Math.max(...hourly.filter((h, i) => i < 6).map(h => h.wind_speed));
            const maxGust = Math.max(...hourly.filter((h, i) => i < 6).map(h => h.wind_gust));

            // if max pop in next 6 hours is 10% > max < 30% then we are questionable
            if ((max > .1) && (max < .3)) status = { ...questionable };
            // if max wind speed in next 6 hours is > 10mph or max wind gust is > 20mph then we are questionable
            if ((maxWind > 10) || (maxGust > 20)) status = { ...questionable };
            // if pop includes 'light' we are questionable
            if (daily[0].weather[0].description.includes('light')) status = { ...questionable };
            // if avg of next 6 hours pop is > 30% we are unsuitable
            if (average > .3) status = { ...unsuitable };
            // if pop > 50% or daily status is rain we are also unsuitable
            if (daily.pop > .5 || daily[0].weather[0].description.includes('thunderstorm')) status = { ...unsuitable };
            // otherwise we will remain suitable
        }

        return (
            <div
                className="flex gap-2 justify-end items-center text-gray-700 capitalize">
                <p style={{ background: status.color }} className="rounded-full h-3 w-3" />
                <p className='text-sm pr-2'>{status.text}</p>
            </div>);
    }

    return (
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Testing Conditions</p>
                <button
                    type="button"
                    className="text-xl font-semibold text-gray-500"
                    onClick={() => window.open('https://radar.weather.gov')}
                >
                    <IoIosMore />
                </button>
            </div>
            <div className="mt-6">
                <div className="mt-6">
                    <div className="flex gap-4 justify-between mb-2 pb-2">
                        {/* {getButtonIcon("", "rgb(254, 201, 15)", <BsCloudSun />)} */}
                        <div>
                            <p className="text-md font-semibold">Current:</p>
                            <p className="text-sm text-gray-400">{current && new Date(current.dt * 1000).toLocaleTimeString()}</p>
                        </div>
                        <div className='items-center'>
                            <p className='text-md font-semibold text-hii text-center'>{dashInfo && dashInfo.locations[dashInfo.weatherDefault].name}</p>
                            {getStatus()}
                        </div>
                    </div>
                    <div className='flex gap-4 mt-4 justify-between items-center pb-3 border-b-1'>
                        <div className='flex gap-2'>
                            {current && getButtonIcon("gray", "#FAFAFB", apiIcon.find(i => i.name === current.weather[0].icon.slice(0, 2)).icon)}
                            <div>
                                <p className="text-md font-semibold">{current && current.temp.toString().slice(0, 2) + '°'}</p>
                                <p className="text-sm text-gray-400">Feels Like: {current && current.feels_like.toString().slice(0, 2) + '°'}</p>
                            </div>
                        </div>
                        <div>
                            {/* Cloud Cover */}
                            <div className='flex gap-1 items-center text-gray-400'>
                                <AiOutlineCloud />
                                {current && current.clouds.toString() + '%'}
                            </div>
                            {/* Humidity */}
                            <div className='flex gap-1 items-center text-gray-400'>
                                <WiHumidity />
                                {current && current.humidity.toString() + '%'}
                            </div>
                            {/* UV Index */}
                            <div className='flex gap-1 items-center text-gray-400'>
                                <WiHot />
                                {current && current.uvi}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div>
                            <p className="text-md font-semibold">Hourly</p>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-4 px-1 pb-3 border-b-1 w-full overflow-x-scroll'>
                        {/* todo exclude weekend days */}
                        {hourly && hourly.map((d, idx) => {
                            if (idx > 12) return <></>;
                            return <div key={idx}>{getDay("gray", "", apiIcon.find(i => i.name === d.weather[0].icon.slice(0, 2)).icon, new Date(d.dt * 1000).toLocaleTimeString())}</div>
                        })}
                    </div>
                    <div className="flex gap-4 mt-4">
                        {getButtonIcon("#03C9D7", "#E5FAFB", <BsCalendar3 />)}
                        <div>
                            <p className="text-md font-semibold">Week Forecast:</p>
                            <p className="text-sm text-gray-400">
                                {daily ?
                                    `${new Date(daily[0].dt * 1000).toLocaleDateString()} - ${new Date(daily[daily.length - 4].dt * 1000).toLocaleDateString()}`
                                    : '0/0/2022 - 0/0/2022'}
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-4 justify-center items-center pb-3 border-b-1'>
                        {/* todo exclude weekend days */}
                        {daily && daily.map((d, idx) => {
                            if (idx > 4) return <></>;
                            return (
                                <div key={idx}>
                                    {getWeeklyDay(d, "gray", "", apiIcon.find(i => i.name === d.weather[0].icon.slice(0, 2)).icon, days[new Date(d.dt * 1000).getUTCDay()].slice(0, 3))}
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherWidget;