import React from 'react'
import EditableTextField from './EditableTextField';
import HoverableTestInfo from './HoverableTestInfo';

// holds state for node hovering, renders event object from timeline to the DOM
export default function MapMarkerInfo({ info, remove }) {

    return (
        <HoverableTestInfo
            remove={remove}
            className="flex items-center gap-2 m-1 py-1 text-sm"
        >
            <EditableTextField
                placeholder={"New Marker"}
                className='p-1 font-semibold'
                onChange={() => console.log("test change")}
            />
            lat
            longitude
            width
            height
            border
            shape
            fill
            {/* attributes? */}
        </HoverableTestInfo>
    )
}