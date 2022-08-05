import React, { useEffect, useState } from 'react'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import HoverableTestInfo from './HoverableTestInfo';

// store information for a note in a given TestView
export default function TestNote({ note, onChange, remove }) {
    const [editMode, setEditMode] = useState(false);
    const [inputObj, setInputObj] = useState();
    const [display, setDisplay] = useState();

    useEffect(() => {
        setDisplay(note);
    }, [note])

    const onNoteChange = (event) => {
        setDisplay(event.value)
        setEditMode(false)
        onChange(event)
    }

    return (
        <HoverableTestInfo remove={remove}>
            {editMode ?
                (<div className='flex w-full'>
                    <li></li>
                    <TextBoxComponent
                        change={onNoteChange}
                        ref={(text) => setInputObj(text)}
                        created={() => inputObj.focusIn(true)}
                        blur={() => setEditMode(false)}
                        value={display}
                    />
                </div>) :
                (<li className='p-1 text-sm' onClick={() => setEditMode(true)}>{display}</li>)
            }
        </HoverableTestInfo >
    )
}