import React from 'react'
import EditableTextField from './EditableTextField';
import HoverableTestInfo from './HoverableTestInfo';

// holds state for node hovering, renders event object from timeline to the DOM
export default function MapLineInfo({ info, remove, scene, setScene, idx, pane, onChange }) {

    const fieldChange = (event, field, coordIdx = null) => {
        if (!event.value) return;
        // to and from need lat or long specification
        let newInfo;
        if (field === 'to' || field === 'from') {
            if (isNaN(event.value)) return;
            newInfo = {
                ...info,
                [field]: [...info[field].map((coord, i) => (i === coordIdx ? parseFloat(event.value) : coord))]
            }
        }
        else if (field === 'color') {
            newInfo = {
                ...info,
                [field]: event.value
            }
        }
        else {
            if (isNaN(event.value)) return;
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
                className='m-1 p-1 font-semibold w-1/4'
                onChange={(e) => fieldChange(e, 'name')}
            />
            <div className='flex w-3/4 gap-4'>
                <div className='w-1/5 items-center gap-2 p-2'>
                    <p className='font-semibold text-center'>Color:</p>
                    <EditableTextField
                        placeholder={info.color}
                        className='p-1 text-center'
                        onChange={(e) => fieldChange(e, 'color')}
                    />
                </div>
                <div className='w-1/5'>
                    <p className='font-semibold'>Start Lat/Long</p>
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
                <div className='w-1/5'>
                    <p className='font-semibold'>End Lat/Long</p>
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
                    <p className='font-semibold text-center'>Dashes:</p>
                    <EditableTextField
                        placeholder={info.dashArray}
                        className='p-1 text-center'
                        onChange={(e) => fieldChange(e, 'dashArray')}
                        editWidth='50%'
                    />
                </div>
                <div>
                    <p className='font-semibold text-center'>Width:</p>
                    <EditableTextField
                        placeholder={info.width}
                        className='p-1 text-center'
                        onChange={(e) => fieldChange(e, 'width')}
                    />
                </div>
            </div>
        </HoverableTestInfo>
    )
}