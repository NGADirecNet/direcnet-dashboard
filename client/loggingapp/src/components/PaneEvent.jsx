import React from 'react'
import EditableTextField from './EditableTextField';
import HoverableTestInfo from './HoverableTestInfo';

// holds state for node hovering, renders event object from timeline to the DOM
export default function PaneEvent({ event, timeOnChange, descOnChange, remove }) {

    return (
        <HoverableTestInfo
            remove={remove}
            className="flex items-center gap-2 m-1 py-1 text-sm"
        >
            <EditableTextField
                placeholder={event.time}
                className='p-1 w-1/6'
                onChange={timeOnChange}
            />
            <EditableTextField
                placeholder={event.description}
                className='w-full'
                onChange={descOnChange}
            />
        </HoverableTestInfo>
    )
}