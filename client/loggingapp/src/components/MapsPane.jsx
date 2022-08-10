import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri';
import EditableTextField from './EditableTextField';
import PaneNode from './PaneNode';
import PaneEvent from './PaneEvent';
import { newEvent, newMapsPane, newNode, newPane } from '../data/contants';
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
        const newPanes = scene.filter(a => a.header.includes("New Action Header"))
        // append copy string to header so we do not have duplicate panes selected
        var copyString = newPanes.length ? ` (${newPanes.length})` : ""
        // create our new pane
        const addNewPane = { ...newMapsPane, header: newMapsPane.header + copyString }
        // add new pane to our test suite
        setScene([
            ...scene,
            addNewPane
        ])
        setSaved(false)
        // set selected pane to newly created pane
        setSelected(addNewPane)
    }

    const removePane = () => {
        setScene([
            ...scene.filter(a => a !== pane)
        ])
        setSaved(false);
        if (isSelected) setSelected("None Selected")
    }

    // update state when an editable field gets changed by the user
    // const fieldChange = (event, field, idx = null, descriptor = null) => {
    //     // events or setups require an idx and descriptor of which key we want
    //     if (field === 'events' || field === 'setup') {
    //         setTest({
    //             // copy test object
    //             ...testSuite,
    //             // copy over our timeline where if we reach the Pane we are manipulating, perform our change, otherwise leave it be
    //             timeline: testSuite.timeline.map(t =>
    //             (t === pane ? {
    //                 // copy over our Pane
    //                 ...t,
    //                 // copy over the field the user is updating, where if we reach the idx we are manipulating, perform the change, otherwise leave it be
    //                 [field]: [...t[field]].map((ob, i) => i === idx ? {
    //                     ...ob,
    //                     [descriptor]: event.value
    //                 }
    //                     : ob)
    //             }
    //                 : t)
    //             )
    //         })
    //     }
    //     else {
    //         // update state, assuming arg 'field' corresponds to object key and event.value corresponds to value
    //         setTest({
    //             ...testSuite,
    //             timeline: testSuite.timeline.map(t => (t === pane ? { ...t, [field]: event.value } : t))
    //         })
    //     }
    //     setSaved(false);
    // }

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
                            onChange={(e) => console.log('header updated', e)}
                        />
                        <EditableTextField
                            placeholder={pane.subheader}
                            className='text-base text-gray-400 font-light'
                            // onChange={(event) => fieldChange(event, "subheader")}
                            onChange={(e) => console.log('subheader updated', e)}
                        />
                    </div>
                    <RemoveButton
                        onClick={removePane}
                        removeHover={removeHover}
                        setRemoveHover={setRemoveHover}
                    />
                </div>

            </div>
            <div className='flex py-3'>
                lat
                long
                zoom
            </div>
            <div className='flex gap-3'>
                <DropdownButton state={showMarkers} setState={setShowMarkers} />
                <div className='w-full'>
                    <p className='font-semibold'>Markers:</p>
                    {(!scene.markers || !scene.markers.length) && <AddButton onClick={() => console.log('added')} />}
                    <MapMarkerInfo info={{test: true}} remove={() => console.log('remove marker')} />
                </div>
            </div>
            <div className='flex gap-3'>
                <DropdownButton state={showLines} setState={setShowLines} />
                <div className='w-full'>
                    <p className='font-semibold'>Lines:</p>
                    {(!scene.lines || !scene.lines.length) && <AddButton onClick={() => console.log('add line')} />}
                    <MapLineInfo info={{test: true}} remove={() => console.log('remove line')} />
                </div>
            </div>
        </div>
    )
}