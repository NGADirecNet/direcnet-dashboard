import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri';
import EditableTextField from './EditableTextField';
import { newLine, newMapsPane, newMarker } from '../data/contants';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import MapMarkerInfo from './MapMarkerInfo';
import MapLineInfo from './MapLineInfo';
import DropdownButton from './DropdownButton'
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export default function MapsPane({ action, isSelected, setSelected, isNewPane = false, scene, setScene, saved, setSaved }) {
    // by default keep the entire pane rendered until user would like to hide it
    const [showPane, setShowPane] = useState(true);
    // display red border/shadow/button when hovering over RemoveButton
    const [removeHover, setRemoveHover] = useState(false);
    // represents either test data, or a new pane
    const [pane, setPane] = useState({})
    const [showMarkers, setShowMarkers] = useState(true);
    const [showLines, setShowLines] = useState(true);
    const [showLatLongZoom, setShowLatLongZoom] = useState(true);
    const [showingAddMarker, showAddMarker] = useState(false);
    const [showingAddLine, showAddLine] = useState(false);
    const [drop, setDrop] = useState(false);

    useEffect(() => {
        if (action) {
            setPane(action)
        }
    }, [action])

    // add a Pane to test suite, appending (x) to already new panes
    const addPane = () => {
        // find new panes that already exist
        const newPanes = scene.actions.filter(a => a.header.includes("New Action Header"))
        // append copy string to header so we do not have duplicate panes selected
        var copyString = newPanes.length ? ` (${newPanes.length})` : ""
        // create our new pane
        const addNewPane = { ...newMapsPane, header: newMapsPane.header + copyString }
        // add new pane to our test suite
        setScene({
            ...scene,
            actions: [...scene.actions, addNewPane]
        })
        setSaved(false)
        // set selected pane to newly created pane
        setSelected(scene.actions.length - 1)
    }

    const removePane = () => {
        setScene({
            ...scene,
            actions: [...scene.actions.filter(a => a !== pane)]
        })
        setSaved(false);
        if (isSelected) setSelected(0)
    }

    // update state when an editable field gets changed by the user
    const fieldChange = (event, field) => {
        if (!event.value) return;
        // events or setups require an idx and descriptor of which key we want
        if (field === 'zoomFactor' && isNaN(event.value)) return;
        if (field === 'latitude' || field === 'longitude') {
            if (isNaN(event.value)) return;
            setScene({
                ...scene,
                actions: [...scene.actions.map(a => (a === pane ? { ...a, mapCenter: { ...a.mapCenter, [field]: parseFloat(event.value) } } : a))]
            })
        }
        else {
            // update state, assuming arg 'field' corresponds to object key and event.value corresponds to value
            setScene({
                ...scene,
                actions: [...scene.actions.map(a => (a === pane ? { ...a, [field]: event.value } : a))]
            })
        }
        setSaved(false);
    }

    const updateScene = (update, idx = null) => {
        setScene({
            ...scene,
            actions: [...scene.actions.map(a => {
                let newPaneObj = {};
                if (update === 'removeLine') newPaneObj = { ...a, lines: [...a.lines.filter((l, i) => i !== idx)] }
                else if (update === 'addLine') newPaneObj = { ...a, lines: [...a.lines, newLine] }
                else if (update === 'addMarker') newPaneObj = { ...a, markers: [...a.markers, newMarker] }
                else if (update === 'removeMarker') newPaneObj = { ...a, markers: [...a.markers.filter((m, i) => i !== idx)] }
                return (a === pane ? newPaneObj : a)
            })]
        });
        setSaved(false);
    }

    const duplicatePane = () => {
        setScene({
            ...scene,
            actions: [...scene.actions, { ...pane }]
        })
    }

    const dropdownSelect = (e) => {
        if (e.itemData) {
            if (e.itemData.value === 'Delete') removePane()
            else duplicatePane()
        }
        drop.clear()
        setSaved(false);
    }

    return isNewPane ? (
        <div
            className={`m-2 p-4 border-1 rounded-2xl ${isSelected ? 'shadow-lg cursor-default' : 'shadow-sm cursor-pointer'}`}
        >
            <AddButton onClick={addPane} />
        </div>
    ) : (
        <div
            className={`m-2 p-4 border-1 rounded-2xl ${isSelected ? 'shadow-lg cursor-default' : `cursor-pointer ${removeHover ? 'shadow-lg' : 'shadow-sm'}`} ${removeHover && 'border-red-600 shadow-lg shadow-red-200'}`}
        // onClick={() => setSelected(pane)}
        >
            <div className='flex gap-3'>
                <DropdownButton state={showPane} setState={setShowPane} />
                <div className='flex justify-between w-full'>
                    <div>
                        <EditableTextField
                            placeholder={pane.header}
                            className="text-lg font-semibold"
                            // onChange={(event) => fieldChange(event, "header")}
                            onChange={(e) => fieldChange(e, 'header')}
                        />
                        <EditableTextField
                            placeholder={pane.subheader}
                            className='text-base text-gray-400 font-light'
                            // onChange={(event) => fieldChange(event, "subheader")}
                            onChange={(e) => fieldChange(e, 'subheader')}
                        />
                    </div>
                    <div className='text-gray-400 p-3 pr-6'>
                        <DropDownListComponent
                            cssClass={'inlinecss'} popupHeight="200px" width="0px" popupWidth="140px"
                            dataSource={['Duplicate', 'Delete']}
                            ref={(drop) => setDrop(drop)}
                            change={(e) => dropdownSelect(e)}
                        />
                    </div>
                </div>

            </div>
            {showPane && (<>
                <div className='flex py-3 gap-3'>
                    <DropdownButton state={showLatLongZoom} setState={setShowLatLongZoom} />
                    {showLatLongZoom ? (<>
                        <div>
                            <div className='flex gap-1'>
                                <p className='font-semibold'>Latitude: </p>
                                <EditableTextField
                                    placeholder={pane.mapCenter ? pane.mapCenter.latitude : 'Lat'}
                                    onChange={(e) => fieldChange(e, 'latitude')}
                                />
                            </div>
                            <div className='flex gap-1'>
                                <p className='font-semibold'>Longitude: </p>
                                <EditableTextField
                                    placeholder={pane.mapCenter ? pane.mapCenter.longitude : 'Long'}
                                    onChange={(e) => fieldChange(e, 'longitude')}
                                />
                            </div>
                            <div className='flex gap-1'>
                                <p className='font-semibold'>Zoom Factor: </p>
                                <EditableTextField
                                    placeholder={pane.zoomFactor}
                                    onChange={(e) => fieldChange(e, 'zoomFactor')}
                                />
                            </div>
                        </div>
                    </>) : (<p className='text-sm text-gray-400 font-semibold'>Lat, Long, Map Zoom Factor...</p>)}
                </div>
                <div className='flex gap-3'>
                    <DropdownButton state={showMarkers} setState={setShowMarkers} />
                    <div className='w-full py-3'>
                        {showMarkers ? (<>
                            <p className='font-semibold'>Markers:</p>
                            {(!pane.markers || !pane.markers.length) && <AddButton onClick={() => updateScene('addMarker')} />}
                            {pane.markers && pane.markers.map((marker, idx) => {
                                const markComp = (
                                    <MapMarkerInfo
                                        info={marker}
                                        remove={() => updateScene('removeMarker', idx)}
                                        scene={scene}
                                        setScene={setScene}
                                        idx={idx}
                                        pane={pane}
                                        onChange={(e => setSaved(false))}
                                    />
                                )
                                if (idx === pane.markers.length - 1)
                                    return (
                                        <div
                                            onMouseEnter={() => showAddMarker(true)}
                                            onMouseLeave={() => showAddMarker(false)}
                                        >
                                            {markComp}
                                            {showingAddMarker && <AddButton onClick={() => updateScene('addMarker')} />}
                                        </div>
                                    )
                                else return (markComp)
                            })}
                        </>) : (<p className='text-sm text-gray-400 font-semibold'>Markers: {pane.markers && pane.markers.map(m => m.dataSource[0].nodeInfo.name + '... ')}</p>)}
                    </div>
                </div>
                <div className='flex gap-3'>
                    <DropdownButton state={showLines} setState={setShowLines} />
                    <div className='w-full py-3'>
                        {showLines ? (<>
                            <p className='font-semibold'>Lines:</p>
                            {(!pane.lines || !pane.lines.length) && <AddButton onClick={() => updateScene('addLine')} />}
                            {pane.lines && pane.lines.map((line, idx) => {
                                const lineComp = (
                                    <MapLineInfo
                                        info={line}
                                        remove={() => updateScene('removeLine', idx)}
                                        scene={scene}
                                        setScene={setScene}
                                        idx={idx}
                                        pane={pane}
                                        onChange={(e => setSaved(false))}
                                    />
                                )
                                if (idx === pane.lines.length - 1)
                                    return (
                                        <div
                                            onMouseEnter={() => showAddLine(true)}
                                            onMouseLeave={() => showAddLine(false)}
                                        >
                                            {lineComp}
                                            {showingAddLine && <AddButton onClick={() => updateScene('addLine')} />}
                                        </div>
                                    )
                                else return (lineComp)
                            })}
                        </>) : (<p className='text-sm text-gray-400 font-semibold'>Lines: {pane.lines && pane.lines.map(l => l.name + '... ')}</p>)}
                    </div>
                </div>
            </>)}
        </div>
    )
}