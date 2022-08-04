import React from 'react'
import EditableTextField from './EditableTextField';
import HoverableTestInfo from './HoverableTestInfo';

// store information for an Important Time in a given TestView
export default function TestTime({ time, nameChange, timeChange, remove }) {

    return (
        <HoverableTestInfo remove={remove} >
            <div className='flex w-full justify-between py-1 text-sm px-5'>
                <EditableTextField
                    placeholder={time.name}
                    classname=""
                    onChange={nameChange}
                />
                <EditableTextField
                    placeholder={time.time}
                    className=""
                    onChange={timeChange}
                />
            </div>
        </HoverableTestInfo>
    )
}