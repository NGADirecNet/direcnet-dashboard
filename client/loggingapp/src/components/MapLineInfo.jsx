import React from 'react'
import EditableTextField from './EditableTextField';
import HoverableTestInfo from './HoverableTestInfo';

// holds state for node hovering, renders event object from timeline to the DOM
export default function MapLineInfo({ info, remove }) {

    return (
        <HoverableTestInfo
            remove={remove}
            className="flex items-center gap-2 m-1 py-1 text-sm"
        >
            <EditableTextField
                placeholder={"New Line"}
                className='p-1 font-semibold'
                onChange={() => console.log("test change")}
            />
            <div className='flex items-center gap-2 p-2'>
                <p>Color: </p>
                <EditableTextField
                    placeholder={"color"}
                    className='p-1'
                    onChange={() => console.log("test change")}
                />
            </div>
            <div>
                <p>From Coordinates</p>
                <EditableTextField
                    placeholder={"From Lat"}
                    className='p-1'
                    onChange={() => console.log("test change")}
                />
                <EditableTextField
                    placeholder={"From Long"}
                    className='p-1'
                    onChange={() => console.log("test change")}
                />
            </div>
            <div>
                <p>To Coordinates</p>
                <EditableTextField
                    placeholder={"To Lat"}
                    className='p-1'
                    onChange={() => console.log("test change")}
                />
                <EditableTextField
                    placeholder={"To Long"}
                    className='p-1'
                    onChange={() => console.log("test change")}
                />
            </div>
            <div>
                <p>Dash Array: </p>
                <EditableTextField
                    placeholder={"Dash Array"}
                    className='p-1'
                    onChange={() => console.log("test change")}
                />
            </div>
            <div>
                <p>Width: </p>
                <EditableTextField
                    placeholder={"Width"}
                    className='p-1'
                    onChange={() => console.log("test change")}
                />
            </div>
        </HoverableTestInfo>
    )
}