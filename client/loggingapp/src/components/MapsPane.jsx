import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri';
import EditableTextField from './EditableTextField';
import PaneNode from './PaneNode';
import PaneEvent from './PaneEvent';
import { newEvent, newLine, newMapsPane, newMarker, newNode, newPane } from '../data/contants';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import MapMarkerInfo from './MapMarkerInfo';
import MapLineInfo from './MapLineInfo';

export function DropdownButton({ state, setState, alwaysHidden }) {
    const [hovering, setHovering] = useState(false);
    const className = alwaysHidden ?
        "text-xl font-semibold text-white rounded-lg cursor-default" :
        hovering ?
            "text-xl font-semibold text-gray-500 rounded-lg" :
            "text-xl font-semibold text-white rounded-lg";

    return (
        <button
            type="button"
            className={className}
            onClick={() => setState(prev => !prev)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {state ? <RiArrowDropDownLine /> : <RiArrowDropRightLine />}
        </button>
    )
}

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
    const fieldChange = (event, field, idx = null, descriptor = null) => {
        // events or setups require an idx and descriptor of which key we want
        if (field === 'latitude' || field === 'longitude') {
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

    const addMarker = () => {
        setScene({
            ...scene,
            actions: [...scene.actions.map(a => (a === pane ? { ...a, markers: [...a.markers, newMarker] } : a))]
        });
        setSaved(false);
    }

    const removeMarker = (idx) => {
        setScene({
            ...scene,
            actions: [...scene.actions.map(a => (a === pane ? { ...a, markers: [...a.markers.filter((m, i) => i !== idx)] } : a))]
        });
        setSaved(false);
    }

    const addLine = () => {
        setScene({
            ...scene,
            actions: [...scene.actions.map(a => (a === pane ? { ...a, lines: [...a.lines, newLine] } : a))]
        });
        setSaved(false);
    }

    const removeLine = (idx) => {
        setScene({
            ...scene,
            actions: [...scene.actions.map(a => (a === pane ? { ...a, lines: [...a.lines.filter((l, i) => i !== idx)] } : a))]
        });
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
                    <RemoveButton
                        onClick={removePane}
                        removeHover={removeHover}
                        setRemoveHover={setRemoveHover}
                    />
                </div>

            </div>
            <div className='flex py-3 gap-3'>
                <DropdownButton state={showLatLongZoom} setState={setShowLatLongZoom} />
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
            </div>
            <div className='flex gap-3'>
                <DropdownButton state={showMarkers} setState={setShowMarkers} />
                <div className='w-full'>
                    <p className='font-semibold'>Markers:</p>
                    {(!pane.markers || !pane.markers.length) && <AddButton onClick={addMarker} />}
                    {pane.markers && pane.markers.map((marker, idx) => {
                        const markComp = (
                            <MapMarkerInfo
                                info={marker}
                                remove={() => removeMarker(idx)}
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
                                    {showingAddMarker && <AddButton onClick={addMarker} />}
                                </div>
                            )
                        else return (markComp)
                    })}
                </div>
            </div>
            <div className='flex gap-3'>
                <DropdownButton state={showLines} setState={setShowLines} />
                <div className='w-full'>
                    <p className='font-semibold'>Lines:</p>
                    {(!pane.lines || !pane.lines.length) && <AddButton onClick={addLine} />}
                    {pane.lines && pane.lines.map((line, idx) => {
                        const lineComp = (
                            <MapLineInfo
                                info={line}
                                remove={() => removeLine(idx)}
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
                                    {showingAddLine && <AddButton onClick={addLine} />}
                                </div>
                            )
                        else return (lineComp)
                    })}
                </div>
            </div>
        </div>
    )
}