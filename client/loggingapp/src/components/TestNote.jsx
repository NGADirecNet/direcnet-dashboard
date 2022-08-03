import React, { useEffect, useState } from 'react'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { useStateContext } from '../contexts/ContextProvider';
import { IoMdRemoveCircle } from 'react-icons/io';

// store information for a note in a given TestView
export default function TestNote({ note, onChange, remove }) {
    const { currentColor } = useStateContext();
    const [editMode, setEditMode] = useState(false);
    const [inputObj, setInputObj] = useState();
    const [display, setDisplay] = useState();

    const [hover, setHover] = useState(false);

    useEffect(() => {
        setDisplay(note);
    }, [note])

    const onNoteChange = (event) => {
        setDisplay(event.value)
        setEditMode(false)
        onChange(event)
    }

    return (
        <div
            className={hover && 'border-1 rounded-lg'}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={`flex ${hover ? 'justify-between' : ''}`}>
                {editMode ?
                    (<div className='flex'>
                        <li></li>
                        <TextBoxComponent
                            change={onNoteChange}
                            ref={(text) => setInputObj(text)}
                            created={() => inputObj.focusIn(true)}
                            blur={() => setEditMode(false)}
                        />
                    </div>) :
                    (<li className='p-1 text-sm' onClick={() => setEditMode(true)}>{display}</li>)
                }
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