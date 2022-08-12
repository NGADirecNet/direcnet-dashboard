import React from 'react'
import EditableTextField from './EditableTextField';
import HoverableTestInfo from './HoverableTestInfo';

// holds state for node hovering, renders event object from timeline to the DOM
export default function MapLineInfo({ info, remove, scene, setScene, idx, pane, onChange }) {

    const fieldChange = (event, field, coordIdx = null) => {
        // to and from need lat or long specification
        let newInfo;
        if (field === 'to' || field === 'from') {
            newInfo = {
                ...info,
                [field]: [...info[field].map((coord, i) => (i === coordIdx ? parseFloat(event.value) : coord))]
            }
        }
        else {
            newInfo = {
                ...info,
                [field]: event.value
            }
        }
        setScene({
            ...scene,
            actions: [...scene.actions.map(a =>
            (a === pane ? {
                ...a, lines: [...a.lines.map((l, i) =>
                    (i === idx ? newInfo : l)
                )]
            } : a)
            )]
        })
        onChange(event);
    }

    return (
        <HoverableTestInfo
            remove={remove}
            className="flex items-center gap-2 m-1 py-1 text-sm"
        >
            <EditableTextField
                placeholder={info.name}
                className='p-1 font-semibold'
                onChange={(e) => fieldChange(e, 'name')}
            />
            <div className='flex items-center gap-2 p-2'>
                <p>Color: </p>
                <EditableTextField
                    placeholder={info.color}
                    className='p-1'
                    onChange={(e) => fieldChange(e, 'color')}
                />
            </div>
            <div>
                <p>From Coordinates</p>
                <EditableTextField
                    placeholder={info.from[0]}
                    className='p-1'
                    onChange={(e) => fieldChange(e, 'from', 0)}
                />
                <EditableTextField
                    placeholder={info.from[1]}
                    className='p-1'
                    onChange={(e) => fieldChange(e, 'from', 1)}
                />
            </div>
            <div>
                <p>To Coordinates</p>
                <EditableTextField
                    placeholder={info.to[0]}
                    className='p-1'
                    onChange={(e) => fieldChange(e, 'to', 0)}
                />
                <EditableTextField
                    placeholder={info.to[1]}
                    className='p-1'
                    onChange={(e) => fieldChange(e, 'to', 1)}
                />
            </div>
            <div>
                <p>Dash Array: </p>
                <EditableTextField
                    placeholder={info.dashArray}
                    className='p-1'
                    onChange={(e) => fieldChange(e, 'dashArray')}
                />
            </div>
            <div>
                <p>Width: </p>
                <EditableTextField
                    placeholder={info.width}
                    className='p-1'
                    onChange={(e) => fieldChange(e, 'width')}
                />
            </div>
        </HoverableTestInfo>
    )
}