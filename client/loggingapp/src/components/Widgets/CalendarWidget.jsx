import React, { useState, useEffect } from 'react'
import { IoIosMore } from 'react-icons/io'
import { DiScrum } from 'react-icons/di'
import { BsConeStriped } from 'react-icons/bs'
import { RiComputerLine, RiVipCrown2Fill } from 'react-icons/ri'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { useStateContext } from '../../contexts/ContextProvider'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars'
import { timeCalc } from '../../data/dataUtil'

const CalendarWidget = () => {
    const { currentColor, cal } = useStateContext();
    let navigate = useNavigate();
    // should default to this week
    const [dateRange, setDateRange] = useState({
        daySpan: 7,
        startDate: new Date(),
        endDate: new Date(Date.now() + 6.048e+8)
    })
    // events in dateRange that will show under Events
    const [eventsInRange, setEventsInRange] = useState([])

    useEffect(() => {
        if (dateRange.startDate === null || dateRange.endDate === null)
            setDateRange({
                daySpan: 7,
                startDate: new Date(),
                endDate: new Date(Date.now() + 6.048e+8)
            })
        // console.log("date range", dateRange)
        // console.log("cal in dash", cal)
        setEventsInRange(filterCal());
    }, [cal, dateRange])

    // useEffect(() => {
    //     console.log("filtered cal", eventsInRange)
    // }, [eventsInRange])

    function filterCal() {
        // console.log("CAL", cal)
        return cal.filter((event) => {
            // console.log("EVENT", event)
            // does event recur
            const doesRecur = event.RecurrenceRule ? true : false
            // if recur, get recur dates in range
            const dateInBetween = (start, end, date) => {
                return (new Date(start) < new Date(date)) && (new Date(date) < new Date(end))
            }

            const getRecurDates = () => {
                return []
            }
            // not in range
            //            [ ---- Range ---- ]
            // start fin
            // [ ---- Range ---- ]
            //                      start fin
            // in Range:
            const inRange = 
                // [ ---- Range ---- ]
                //   start       fin
                (dateInBetween(dateRange.startDate, dateRange.endDate, event.StartTime) && dateInBetween(dateRange.startDate, dateRange.endDate, event.EndTime)) ||
                //        [ ---- Range ---- ]
                //  start        fin
                (dateInBetween(dateRange.startDate, dateRange.endDate, event.EndTime) && event.StartTime < dateRange.startDate) ||
                // [ ---- Range ---- ]
                //              start     fin
                (dateInBetween(dateRange.startDate, dateRange.endDate, event.StartTime) && event.EndTime > dateRange.endDate) ||
                //       [ ---- Range ---- ]
                // start                       fin
                (event.StartTime < dateRange.startDate && event.EndTime > dateRange.endDate)
            // console.log("does recur", doesRecur)
            // console.log("in range", inRange, dateRange)
            return (!doesRecur && inRange)
        })
    }

    // displays event nicely under Events tab
    const getEventDisplay = (event) => {
        const isPast = event.StartTime < new Date()
        const time = timeCalc(new Date(event.StartTime))
        return (
            <div className="flex justify-between mt-4 w-full">
                <div className="flex gap-4">
                    <button
                        type="button"
                        style={{ color: currentColor }}
                        className="text-base hover:drop-shadow-xl text-white rounded-full p-3"
                    >
                        {getEventIcon(event)}
                    </button>
                    <div>
                        <p className="text-md font-semibold">{event.Subject}</p>
                        <p className="text-sm text-gray-400">{event.Location}</p>
                    </div>
                </div>
                <p>{isPast ? `${time} ago` : `in ${time}`}</p>
            </div>
        )
    }

    // If event contains "Scrum", "SW/Software", or "Testing", add special logo to event. Otherwise default to calendar icon
    const getEventIcon = (event) => {
        const sub = event.Subject.toLowerCase()
        if (sub.includes("scrum")) {
            return <DiScrum />
        }
        else if (sub.includes("test")) {
            return <BsConeStriped />
        }
        else if (sub.includes("demo")) {
            return <RiVipCrown2Fill />
        }
        else if (sub.includes("sw ") || sub.includes("software")) {
            return <RiComputerLine />
        }
        else
            return <FaRegCalendarAlt />
    }

    return (
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Upcoming</p>
                <button
                    type="button"
                    className="text-xl font-semibold text-gray-400"
                    onClick={() => navigate('/calendar')}
                >
                    <IoIosMore />
                </button>
            </div>
            <div className='p-2 rounded-lg hover:bg-light-gray m-2'>
                <DateRangePickerComponent
                    change={setDateRange}
                    placeholder={"This Week"}
                />
            </div>
            <div className="border-b-1 border-color pb-4 mt-2">
                <p className="text-md font-semibold mb-2">Events</p>
                {eventsInRange.map((event) => getEventDisplay(event))}
            </div>
            <div className="flex justify-between items-center mt-5 border-color">
                <div className="mt-3">
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="View All"
                        borderRadius="10px"
                        onClick={() => navigate('/calendar')}
                    />
                </div>
                <p className="text-gray-400 text-sm">
                    {`${eventsInRange.length} Events in ${dateRange.daySpan} day span`}
                    {/*${new Date(dateRange.startDate).toLocaleString().split(',')[0]} - ${new Date(dateRange.endDate).toLocaleString().split(',')[0]}*/}
                </p>
            </div>
        </div>
    )
}

export default CalendarWidget