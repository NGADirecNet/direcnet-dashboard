import React, { useState } from 'react'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { FiExternalLink } from 'react-icons/fi';
import { MdModeEditOutline } from 'react-icons/md';
import EditableTextField from './EditableTextField';
import HoverableTestInfo from './HoverableTestInfo';

// holds state for node hovering, renders event object from timeline to the DOM
export default function PaneAttachment({ attachment, nameOnChange, linkOnChange, remove }) {
    const [inputObj, setInputObj] = useState();
    const [showLinkField, setShowLinkField] = useState(false);
    const fieldShow = () => setShowLinkField(true);
    const fieldHide = () => setShowLinkField(false);

    return (
        <HoverableTestInfo
            remove={remove}
            className="flex gap-2 m-1 py-1 text-sm w-full justify-between"
        >
            <EditableTextField
                placeholder={attachment.name}
                className='p-1 w-1/2'
                onChange={nameOnChange}
            />
            <div className='flex justify-end gap-1 w-1/2'>

            {attachment.link !== "" && attachment.link !== "Sharepoint Link here" ? <button
                type='button'
                className='text-xl text-blue-600 font-semibold p-2 border-1 rounded-lg border-white hover:border-gray-100'
                onClick={() => window.open(attachment.link)}
            >
                <FiExternalLink />
            </button> : (<button className='text-xl text-blue-600 font-semibold p-2 border-1 rounded-lg border-white'
            ></button>)}
            {showLinkField &&
                <TextBoxComponent
                    change={linkOnChange}
                    ref={text => setInputObj(text)}
                    created={() => inputObj.focusIn(true)}
                    blur={fieldHide}
                    value={attachment.link}
                    width='200px'
                    />}
            <button
                type='button'
                className='text-xl font-semibold p-2 border-1 rounded-lg border-white hover:border-gray-100'
                onClick={fieldShow}
                >
                <MdModeEditOutline />
            </button>
                </div>
        </HoverableTestInfo>
    )
}