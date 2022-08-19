import React from 'react'
import Dropdown from './Dropdown';
import EditableTextField from './EditableTextField';
import HoverableTestInfo from './HoverableTestInfo';

// holds state for node hovering, renders event object from timeline to the DOM
export default function MapMarkerInfo({ info, remove, scene, setScene, idx, pane, onChange }) {

    const fieldChange = (event, field) => {
        if (!event.value) return;
        if (field === 'shape' && event.value === info.shape) return;
        // lat long or name need to be dataSource[0]
        let newInfo;
        if (field === 'name' || field === 'latitude' || field === 'longitude') {
            if (field === 'name') {
                newInfo = newInfo = {
                    ...info,
                    dataSource: [...info.dataSource.map(d => { return { ...d, nodeInfo: { name: event.value } } })]
                }
            }
            else {
                if (isNaN(event.value)) return;
                newInfo = {
                    ...info,
                    dataSource: [...info.dataSource.map(d => { return { ...d, [field]: parseFloat(event.value) } })]
                }
            }
        }
        // border needs to be border.width or border.color
        else if (field === 'borderwidth' || field === 'bordercolor') {
            if (field === 'borderwidth') {
                if (isNaN(event.value)) return;
                newInfo = { ...info, border: { ...info.border, width: event.value } }
            }
            else newInfo = { ...info, border: { ...info.border, color: event.value } }
        }
        else {
            newInfo = { ...info, [field]: event.value }
        }
        setScene({
            ...scene,
            actions: [...scene.actions.map(a =>
            (a === pane ? {
                ...a, markers: [...a.markers.map((m, i) =>
                    (i === idx ? newInfo : m)
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
                placeholder={info.dataSource[0].nodeInfo.name}
                className='m-1 p-1 font-semibold w-1/4'
                onChange={(e) => fieldChange(e, 'name')}
            />
            <div className='flex w-full'>
                <div className='w-1/4'>
                    <div className='gap-1 items-center p-1'>
                        <p className='font-semibold'>Latitude:</p>
                        <EditableTextField
                            placeholder={info.dataSource[0].latitude}
                            className='p-1 w-full'
                            onChange={(e) => fieldChange(e, 'latitude')}
                        />
                    </div>
                    <div className='gap-1 items-center p-1'>
                        <p className='font-semibold'>Longitude:</p>
                        <EditableTextField
                            placeholder={info.dataSource[0].longitude}
                            className='p-1 w-full'
                            onChange={(e) => fieldChange(e, 'longitude')}
                        />
                    </div>
                </div>
                <div className='w-1/4'>
                    <div className='gap-1 items-center p-1'>
                        <p className='font-semibold'>Width:</p>
                        <EditableTextField
                            placeholder={info.width}
                            className='p-1'
                            onChange={(e) => fieldChange(e, 'width')}
                        />
                    </div>
                    <div className='gap-1 items-center p-1'>
                        <p className='font-semibold'>Height:</p>
                        <EditableTextField
                            placeholder={info.height}
                            className='p-1'
                            onChange={(e) => fieldChange(e, 'height')}
                        />
                    </div>
                </div>
                <div className='w-1/4'>
                    <div className='gap-1 items-center p-1'>
                        <p className='font-semibold text-center'>Shape:</p>
                        <Dropdown
                            data={['Diamond', 'Circle', 'Rectangle', 'Triangle', 'InvertedTriangle', 'Pentagon']}
                            onChange={(e) => fieldChange({ value: e }, 'shape')}
                            defaultValue={info.shape}
                        />
                    </div>
                    <div className='gap-1 items-center p-1'>
                        <p className='font-semibold text-center'>Fill Color:</p>
                        <EditableTextField
                            placeholder={info.fill}
                            className='p-1 text-center'
                            onChange={(e) => fieldChange(e, 'fill')}
                        />
                    </div>
                </div>
                <div className='w-1/4'>
                    <div className='gap-1 items-center p-1'>
                        <p className='font-semibold text-center'>Border Width:</p>
                        <EditableTextField
                            placeholder={info.border.width}
                            className='p-1 text-center'
                            onChange={(e) => fieldChange(e, 'borderwidth')}
                        />
                    </div>
                    <div className='gap-1 items-center p-1'>
                        <p className='font-semibold text-center'>Border Color</p>
                        <EditableTextField
                            placeholder={info.border.color}
                            className='p-1 text-center'
                            onChange={(e) => fieldChange(e, 'bordercolor')}
                        />
                    </div>
                </div>
            </div>
        </HoverableTestInfo>
    )
}