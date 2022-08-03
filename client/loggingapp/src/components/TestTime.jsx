import React, { useEffect, useState } from 'react'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { useStateContext } from '../contexts/ContextProvider';
import { IoMdRemoveCircle } from 'react-icons/io';
import EditableTextField from './EditableTextField';

// store information for an Important Time in a given TestView
export default function TestTime({ time, nameChange, timeChange, remove }) {
    const { currentColor } = useStateContext();
    const [hover, setHover] = useState(false);

    return (
        <div
            className={hover && 'border-1 rounded-lg'}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={`flex ${hover ? 'justify-between' : ''}`}>
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