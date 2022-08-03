import React, { useEffect, useState } from 'react'
import { EditableTextField } from '../components'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { TbGitCommit } from 'react-icons/tb'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { RiTimeLine } from 'react-icons/ri'
import { gridTestStatus } from '../data/dashLogos'

// encapsulates everything in more details part of a TestView page
export default function DetailsPane({ test, setTest, saved, setSaved }) {

    const [dateEditMode, setDateEditMode] = useState(false);
    const [dateObj, setDateObj] = useState();

    const [locEditMode, setLocEditMode] = useState(false);
    const [locObj, setLocObj] = useState();

    const [statEditMode, setStatEditMode] = useState(false);
    const [statObj, setStatObj] = useState();

    //todo use effect turn all edit modes on if we are creating a new entry

    const locationItems = [
        { "Name": "Rome, NY", "value": "rome" },
        { "Name": "Stockbridge, NY", "value": "stockbridge" },
        { "Name": "Add New", "value": "new" },
    ]

    const statusItems = [
        { "Name": "Completed", "value": "completed" },
        { "Name": "In Progress", "value": "in progress" },
        { "Name": "Scheduled", "value": "scheduled" },
    ]

    const fieldChange = (event, field) => {
        if (field === 'status' || field === 'location') {
            setTest({
                ...test,
                [field]: event.itemData.value
            })
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
            locationItems.find(o => o.value === value) :
            statusItems.find(o => o.value === value)
        return find ? find["Name"] : value
    }

    return (
        <div
            className='m-2 p-4 border-1 rounded-2xl shadow-sm'
        >
            <p className='text-lg font-semibold mb-5 pl-10'>Details</p>
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
                            dataSource={locationItems}
                            fields={{ text: 'Name' }}
                            placeholder={getPlaceholder(test.location, 'loc')}
                            change={(event) => fieldChange(event, "location")}
                            ref={(drop) => setLocObj(drop)}
                            created={() => locObj.focusIn(true)}
                            blur={() => setLocEditMode(false)}
                        />) :
                        (<p>
                            {getPlaceholder(test.location, 'loc') || "Select Location"}
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