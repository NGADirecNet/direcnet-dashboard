import React, { useState, useEffect } from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

/**
 * Represents input field user is able to modify and update in a TestView
 * @param {*} props 
 * @returns mounted TextBoxComponent or mounted text component
 */
const EditableTextField = ({ placeholder, className, onChange }) => {

    const [editMode, setEditMode] = useState(false);
    const [inputObj, setInputObj] = useState();
    const [display, setDisplay] = useState();

    useEffect(() => {
        setDisplay(placeholder)
    }, [placeholder])

    const onTextChange = (event) => {
        setDisplay(event.value)
        setEditMode(false)
        onChange(event)
    }

    return (
        <div 
            onClick={() => setEditMode(true)}
            className={className}
        >
            {editMode ?
                (<TextBoxComponent
                    change={onTextChange} 
                    ref={(text) => setInputObj(text)}
                    created={() => inputObj.focusIn(true)}
                    blur={() => setEditMode(false)}   
                />) : 
                (<p>
                    {display}
                </p>)
            }
        </div>
    );
}

export default EditableTextField;