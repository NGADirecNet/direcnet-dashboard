import React, { useEffect, useState } from 'react'
import { EditableTextField } from '../components'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { TbGitCommit } from 'react-icons/tb'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { RiTimeLine } from 'react-icons/ri'
import { gridTestStatus } from '../data/dashLogos'
import { useStateContext } from '../contexts/ContextProvider'

// encapsulates everything in more details part of a TestView page
export default function DetailsPane({ test, setTest, saved, setSaved, deleteTest, isNew=false }) {

    const { dashInfo } = useStateContext();
    const [dateEditMode, setDateEditMode] = useState(false);
    const [dateObj, setDateObj] = useState();

    const [locEditMode, setLocEditMode] = useState(false);
    const [locObj, setLocObj] = useState();

    const [statEditMode, setStatEditMode] = useState(false);
    const [statObj, setStatObj] = useState();

    const [confirmDelete, setConfirmDelete] = useState(false);


    const statusItems = [
        { "Name": "Completed", "value": "completed" },
        { "Name": "In Progress", "value": "in progress" },
        { "Name": "Scheduled", "value": "scheduled" },
    ]

    // returns
    // 'completed' - past
    // 'in progress' - today
    // 'scheduled' - future
    const pastTodayOrFuture = (date) => {
        var inputDate = new Date(date);
        var today = new Date();
        // if today
        if (inputDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) return 'in progress'
        // else if past
        else if (inputDate < today) return 'completed'
        // else present
        else return 'scheduled'
    }

    const fieldChange = (event, field) => {
        if (field === 'status') {
            setTest({
                ...test,
                [field]: event.itemData.value
            })
        }
        else if (field === 'date') {
            // change in date defaults the status
            // now=in prog, future=scheduled, past=completed
            // status still changeable in and of itself this just makes usability easier
            const dateChange = pastTodayOrFuture(event.value);
            fieldChange({ itemData: { value: dateChange } }, 'status')
        }
        else
            setTest({
                ...test,
                [field]: event.value
            });
        setSaved(false);
    }

    // get "Name" key value when entering "value" key
    // specify whether we are looking in locationItems or statusItems
    const getPlaceholder = (value, type) => {
        const find = type === 'loc' ?
            dashInfo.locations.find(o => o.name === value) :
            statusItems.find(o => o.value === value)
        return find ? find["Name"] : value
    }

    return (
        <div
            className='m-2 p-4 border-1 rounded-2xl shadow-sm'
        >
            <div className='flex justify-between mb-5 px-10'>
                <p className='text-lg font-semibold'>Details</p>{!isNew &&
                (confirmDelete ? (<button onBlur={() => setConfirmDelete(false)} onClick={deleteTest}
                    style={{
                        color: 'rgb(0, 194, 146)',
                        backgroundColor: 'rgb(235, 250, 242)',
                    }}
                    className='font-bold border-1 border-green-600 p-2 rounded-lg'>
                    Confirm Delete
                </button>)
                    : (<button onClick={() => setConfirmDelete(true)}
                    style={{
                        color: 'rgb(228, 106, 118)',
                        backgroundColor: 'rgb(255, 244, 229)',
                    }}
                    className='font-bold border-1 border-red-600 p-2 rounded-lg'>
                    Delete Test Suite
                </button>))}
            </div>
            <div className='flex items-center gap-5'>
                <TbGitCommit />
                <p className='w-1/12'>Commit</p>
                <div className='flex'>
                    <p>[</p>
                    <EditableTextField
                        placeholder={test.commit || "Enter Commit"}
                        onChange={(event) => fieldChange(event, "commit")}
                    />
                    <p>]</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <FaRegCalendarAlt />
                <p className='w-1/12'>Date</p>
                <div className='w-1/4' onClick={() => setDateEditMode(true)}>
                    {dateEditMode ?
                        (<DateTimePickerComponent
                            placeholder={test.date ? new Date(test.date).toLocaleString("en-US") : new Date(Date.now()).toLocaleString("en-US")}
                            change={(event) => fieldChange(event, "date")}
                            ref={(date) => setDateObj(date)}
                            created={() => {
                                dateObj.focusIn(true)
                                dateObj.navigateTo(new Date())
                            }}
                            blur={() => setDateEditMode(false)}

                        />) :
                        (<p>
                            {test.date ? new Date(test.date).toLocaleString("en-US") : new Date(Date.now()).toLocaleString("en-US")}
                        </p>)
                    }
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <HiOutlineLocationMarker />
                <p className='w-1/12'>Location</p>
                <div className='w-1/4' onClick={() => setLocEditMode(true)}>
                    {locEditMode ?
                        (<DropDownListComponent
                            dataSource={dashInfo.locations}
                            fields={{ text: 'name', value: 'name' }}
                            placeholder={test.location}
                            change={(event) => fieldChange(event, "location")}
                            ref={(drop) => setLocObj(drop)}
                            created={() => locObj.focusIn(true)}
                            blur={() => setLocEditMode(false)}
                        />) :
                        (<p>
                            {test.location || "Select Location"}
                        </p>)
                    }
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <RiTimeLine />
                <p className='w-1/12'>Status</p>
                <div className='w-1/4' onClick={() => setStatEditMode(true)}>
                    {statEditMode ?
                        (<DropDownListComponent
                            dataSource={statusItems}
                            fields={{ text: 'Name' }}
                            placeholder={getPlaceholder(test.status, 'stat')}
                            change={(event) => fieldChange(event, "status")}
                            ref={(drop) => setStatObj(drop)}
                            created={() => statObj.focusIn(true)}
                            blur={() => setStatEditMode(false)}
                        />) :
                        // (<p>
                        //     {test.status || "Select Status"}
                        // </p>)
                        (gridTestStatus({ status: test.status }))
                    }
                </div>
            </div>
        </div>
    )
}