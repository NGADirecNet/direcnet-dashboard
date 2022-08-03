import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import EditableTextField from './EditableTextField';
import { IoMdRemoveCircle } from 'react-icons/io';


// holds state for node hovering, renders event object from timeline to the DOM
export default function PaneEvent({ event, timeOnChange, descOnChange, remove }) {
    const { currentColor } = useStateContext();
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`flex gap-2 m-1 py-1 text-sm ${hover && 'border-1 rounded-lg'}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <EditableTextField
                placeholder={event.time}
                className='w-1/6'
                onChange={timeOnChange}
            />
            <div className={`flex w-full ${hover && 'justify-between'}`}>
                <EditableTextField
                    placeholder={event.description}
                    className='w-full'
                    onChange={descOnChange}
                />
                {hover &&
                    <button
                        type="button"
                        style={{ color: currentColor }}
                        className="text-lg hover:drop-shadow-xl text-white rounded-full p-2"
                        onClick={remove}
                    >
                        <IoMdRemoveCircle />
                    </button>
                }
            </div>
        </div>
    )
}