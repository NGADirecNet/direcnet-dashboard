import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri';
import EditableTextField from './EditableTextField';
import PaneNode from './PaneNode';
import PaneEvent from './PaneEvent';
import { newEvent, newNode, newPane } from '../data/contants';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';

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

export default function TestPane({ scenario, isSelected, setSelected, isNewPane = false, testSuite, setTest, saved, setSaved }) {
    // by default keep in depth steps opened
    const [showSteps, setShowSteps] = useState(true);
    // by default keep timeline opened
    const [showMoreTimeline, setShowTimeline] = useState(true);
    // by default keep attachments hidden until user wants to see
    const [showAttach, setShowAttach] = useState(false);
    // by default keep the entire pane rendered until user would like to hide it
    const [showPane, setShowPane] = useState(true);
    // show or hide the option to add a new node to setup portion of the Pane
    const [showingAddNode, showAddNode] = useState(false);
    // show or hide the option to add a new event to timeline portion of the Pane
    const [showingAddEvent, showAddEvent] = useState(false);
    // display red border/shadow/button when hovering over RemoveButton
    const [removeHover, setRemoveHover] = useState(false);
    // represents either test data, or a new pane
    const [pane, setPane] = useState({})

    useEffect(() => {
        if (scenario) {
            setPane(scenario)
        }
    }, [scenario])

    // add a Pane to test suite, appending (x) to already new panes
    const addPane = () => {
        // find new panes that already exist
        const newPanes = testSuite.timeline.filter(t => t.header.includes("New Scenario Header"))
        // append copy string to header so we do not have duplicate panes selected
        var copyString = newPanes.length ? ` (${newPanes.length})` : ""
        // create our new pane
        const addNewPane = {...newPane, header : newPane.header + copyString }
        // add new pane to our test suite
        setTest({
            ...testSuite,
            timeline: [...testSuite.timeline, addNewPane]
        })
        setSaved(false)
        // set selected pane to newly created pane
        setSelected(newPane)
    }

    const removePane = () => {
        setTest({
            ...testSuite,
            timeline: testSuite.timeline.filter(t => t !== pane)
        })
        setSaved(false);
        if (isSelected) setSelected("None Selected")
    }

    // update state when an editable field gets changed by the user
    const fieldChange = (event, field, idx = null, descriptor = null) => {
        // events or setups require an idx and descriptor of which key we want
        if (field === 'events' || field === 'setup') {
            setTest({
                // copy test object
                ...testSuite,
                // copy over our timeline where if we reach the Pane we are manipulating, perform our change, otherwise leave it be
                timeline: testSuite.timeline.map(t =>
                (t === pane ? {
                    // copy over our Pane
                    ...t,
                    // copy over the field the user is updating, where if we reach the idx we are manipulating, perform the change, otherwise leave it be
                    [field]: [...t[field]].map((ob, i) => i === idx ? {
                        ...ob,
                        [descriptor]: event.value
                    }
                        : ob)
                }
                    : t)
                )
            })
        }
        else {
            // update state, assuming arg 'field' corresponds to object key and event.value corresponds to value
            setTest({
                ...testSuite,
                timeline: testSuite.timeline.map(t => (t === pane ? { ...t, [field]: event.value } : t))
            })
        }
        setSaved(false);
    }

    const addNode = () => {
        setTest({
            ...testSuite,
            timeline: testSuite.timeline.map(t => (t === pane ? { ...t, setup: [...t.setup, newNode] } : t))
        })
        setSaved(false);
    }

    const removeNode = (idx) => {
        setTest({
            ...testSuite,
            timeline: testSuite.timeline.map(t => (t === pane ? { ...t, setup: t.setup.filter((n, i) => i !== idx) } : t))
        })
        setSaved(false);
    }

    const addEvent = () => {
        setTest({
            ...testSuite,
            timeline: testSuite.timeline.map(t => (t === pane ? { ...t, events: [...t.events, newEvent] } : t))
        })
        setSaved(false);
    }

    const removeEvent = (idx) => {
        setTest({
            ...testSuite,
            timeline: testSuite.timeline.map(t => (t === pane ? { ...t, events: t.events.filter((n, i) => i !== idx) } : t))
        })
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
            className={`m-2 p-4 border-1 rounded-2xl ${isSelected ? 'shadow-lg cursor-default' :  `cursor-pointer ${removeHover ? 'shadow-lg' : 'shadow-sm'}`} ${removeHover && 'border-red-600 shadow-lg shadow-red-200'}`}
            // onClick={() => setSelected(pane)}
        >
            <div className='flex gap-3'>
                <DropdownButton state={showPane} setState={setShowPane} />
                <div className='flex justify-between w-full'>
                    <div>
                        <EditableTextField
                            placeholder={pane.header}
                            className="text-lg font-semibold"
                            onChange={(event) => fieldChange(event, "header")}
                        />
                        <EditableTextField
                            placeholder={pane.subheader}
                            className='text-base text-gray-400 font-light'
                            onChange={(event) => fieldChange(event, "subheader")}
                        />
                    </div>
                    <RemoveButton 
                        onClick={removePane} 
                        removeHover={removeHover}
                        setRemoveHover={setRemoveHover}
                    />
                </div>
            </div>
            {showPane && (<>
                <div
                    className='flex gap-3'
                    onMouseEnter={() => showAddNode(true)}
                    onMouseLeave={() => showAddNode(false)}
                >
                    {<DropdownButton state={showSteps} setState={setShowSteps} />}
                    <div className='flex gap-3 m-1 justify-center w-full'>
                        {pane.setup && pane.setup.map((node, idx) => {
                            const paneProps = {
                                node: node,
                                onChange: (event) => fieldChange(event, "setup", idx, "name"),
                                showDesc: showSteps,
                                descOnChange: (event) => fieldChange(event, "setup", idx, "description"),
                                removeNode: () => removeNode(idx)
                            }
                            return <PaneNode {...paneProps} />
                        })}
                    </div>
                    {showingAddNode && <AddButton onClick={addNode} />}
                </div>
                <div className='flex gap-3'>
                    {<DropdownButton state={showMoreTimeline} setState={setShowTimeline} alwaysHidden={pane.events && pane.events.length < 5} />}
                    <div className='w-full'>
                        {(!pane.events || !pane.events.length) && <AddButton onClick={addEvent} />}
                        {pane.events && pane.events.map((event, idx) => {
                            // if shortened timeline, only show the first 5 until user shows more
                            if (!showMoreTimeline && idx > 4) return <></>;
                            else if (idx === pane.events.length - 1)
                                return (
                                    <div
                                        onMouseEnter={() => showAddEvent(true)}
                                        onMouseLeave={() => showAddEvent(false)}
                                    >
                                        <PaneEvent
                                            event={event}
                                            timeOnChange={(event) => fieldChange(event, "events", idx, "time")}
                                            descOnChange={(event) => fieldChange(event, "events", idx, "description")}
                                            remove={(e) => removeEvent(idx)}
                                        />
                                        {showingAddEvent && <AddButton onClick={addEvent} />}
                                    </div>
                                )
                            else return (
                                <PaneEvent
                                    event={event}
                                    timeOnChange={(event) => fieldChange(event, "events", idx, "time")}
                                    descOnChange={(event) => fieldChange(event, "events", idx, "description")}
                                    remove={(e) => removeEvent(idx)}
                                />
                            )
                        })}
                    </div>
                </div>
                {pane.attachments && (
                    <div className='flex gap-3'>
                        {<DropdownButton state={showAttach} setState={setShowAttach} />}
                        <div className='w-full'>
                            <p className='font-semibold text-`sm'>Attachments:</p>
                            {showAttach && (
                                <>
                                    <div className='grid grid-cols-3 gap-2'>
                                        {pane.attachments && pane.attachments.map((media) =>
                                            <video width="320" height="240" controls>
                                                <source src={media} alt="video" />
                                            </video>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </>)}
        </div>
    )
}