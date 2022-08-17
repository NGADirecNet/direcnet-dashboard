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
import { RecurrenceEditorComponent } from '@syncfusion/ej2-react-schedule'

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
    const [recObj, setRecObj] = useState();

    // useEffect(() => {
    //     console.log("rec object", recObj)
    // }, [recObj])

    useEffect(() => {
        if (dateRange.startDate === null || dateRange.endDate === null)
            setDateRange({
                daySpan: 7,
                startDate: new Date(),
                endDate: new Date(Date.now() + 6.048e+8)
            })
        setEventsInRange(filterCal());
    }, [cal, dateRange])

    // useEffect(() => {
    //     console.log("filtered cal", eventsInRange)
    // }, [eventsInRange])

    function getNextRecurDate(event) {
        const start = new Date(event.StartTime)
        let dates = recObj && recObj.getRecurrenceDates(start, event.RecurrenceRule)
        return dates && dates[0]
    }

    function filterCal() {
        return cal.filter((event) => {
            // does event recur
            const doesRecur = event.RecurrenceRule ? true : false

            const dateInBetween = (start, end, date) => {
                return (new Date(start) < new Date(date)) && (new Date(date) < new Date(end))
            }

            const isNextRecurDateInRange = () => {
                const next = getNextRecurDate(event)
                return dateInBetween(dateRange.startDate, dateRange.endDate, next)
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
            return doesRecur ? isNextRecurDateInRange() : inRange
        })
    }

    // displays event nicely under Events tab
    const getEventDisplay = (event) => {
        // const isPast = event.StartTime < new Date()
        const dateToCalc = event.RecurrenceRule ? getNextRecurDate(event) : new Date(event.StartTime)
        const time = timeCalc(dateToCalc)
        return (
            <div className="flex justify-between mt-4 w-full py-1 items-center">
                <div className="flex gap-4">
                    <button
                        type="button"
                        style={{ color: currentColor }}
                        className="text-base hover:drop-shadow-lg text-white rounded-full p-3 m-1 hover:bg-light-gray"
                        onClick={() => navigate('/calendar')}
                    >
                        {getEventIcon(event)}
                    </button>
                    <div className='items-center'>
                        <p className="text-md font-semibold">{event.Subject}</p>
                        <p className="text-sm text-gray-400">{event.Location}</p>
                    </div>
                </div>
                <p className='text-gray-400 px-2'>{/*isPast ? `${time} ago` : `in ${time}`*/`in ${time}`}</p>
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
                <RecurrenceEditorComponent 
                    style={{ display: 'none'}}
                    ref={(rec) => setRecObj(rec)}
                />
            </div>
            <div className="border-b-1 border-color pb-4 mt-2">
                <p className="text-md font-semibold mb-2">Events</p>
                <div className='h-72 overflow-auto'>
                    {eventsInRange
                        .sort((a, b) => {
                            const getTime = (ev) => ev.RecurrenceRule ? getNextRecurDate(ev) : new Date(ev.StartTime);
                            return getTime(a) > getTime(b) ? 1 : -1})
                        .map((event) => getEventDisplay(event))
                    }
                </div>
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