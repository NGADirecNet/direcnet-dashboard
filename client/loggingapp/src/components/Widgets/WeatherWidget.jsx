import React from 'react'
import { IoIosMore } from 'react-icons/io'
import { BsCloudSun, BsCalendar3, BsCloudRainHeavy, BsCloudRain, BsSun } from 'react-icons/bs'
import { TbPlayerTrackNext } from 'react-icons/tb'
import { AiOutlineCloud, } from 'react-icons/ai'
import { useWeatherContext } from '../../contexts/WeatherContextProvider'
import { apiIcon } from '../../data/weatherUtil'
import { days } from '../../data/contants'

const WeatherWidget = () => {

    const { weatherData, daily } = useWeatherContext();

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
            <div className="mt-10">
                <div className="mt-8">
                    <div className="flex gap-4">
                        {getButtonIcon("", "rgb(254, 201, 15)", <BsCloudSun />)}
                        <div>
                            <p className="text-md font-semibold">Next Suitable Time:</p>
                            <p className="text-sm text-gray-400">Interval</p>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-4 justify-center items-center pb-3 border-b-1'>
                        {getButtonIcon("gray", "#FAFAFB", <AiOutlineCloud />)}
                        <p className='text-sm text-center font-semibold'>[Day]</p>
                        <p className='text-sm text-center font-semibold'>[Start Time - End Time]</p>
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
                        {daily.map((d, idx) => {
                            if (idx > 4) return <></>;
                            return getDay("gray", "", apiIcon.find(i => i.name === d.weather[0].icon.slice(0, 2)).icon, days[new Date(d.dt * 1000).getUTCDay()].slice(0, 3))
                        })}
                    </div>
                    <div className="flex gap-4 mt-4">
                        {getButtonIcon("rgb(0, 194, 146)", "rgb(235, 250, 242)", <TbPlayerTrackNext />)}
                        <div>
                            <p className="text-md font-semibold">Upcoming Suitable Days:</p>
                            <p className="text-sm text-gray-400">July 2022</p>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-4 justify-center items-center pb-3'>
                        {getDay("gray", "#FAFAFB", <AiOutlineCloud />, "7/-")}
                        {getDay("", "rgb(254, 201, 15)", <BsCloudSun />, "7/-")}
                        {getDay("", "rgb(254, 201, 15)", <BsSun />, "7/-")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherWidget;