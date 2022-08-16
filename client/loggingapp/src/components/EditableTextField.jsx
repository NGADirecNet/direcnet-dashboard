import React, { useState, useEffect } from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

/**
 * Represents input field user is able to modify and update in a TestView
 * @param {*} props 
 * @returns mounted TextBoxComponent or mounted text component
 */
const EditableTextField = ({ placeholder, className, onChange, editWidth = '100%' }) => {

    const [editMode, setEditMode] = useState(false);
    const [inputObj, setInputObj] = useState();

    const onTextChange = (event) => {
        setEditMode(false)
        if (event.value) onChange(event)
    }

    return (
        <div
            onClick={() => setEditMode(true)}
            className={className + ' hover:font-semibold border-1 border-white hover:border-gray-100 rounded-lg hover:cursor-text p-1'}
        >
            {editMode ?
                (<TextBoxComponent
                    change={onTextChange}
                    ref={(text) => setInputObj(text)}
                    created={() => inputObj.focusIn(true)}
                    blur={() => setEditMode(false)}
                    value={placeholder}
                    width={editWidth}
                />) :
                (<p>
                    {placeholder}
                </p>)
            }
        </div>
    );
}

export default EditableTextField;