import React, { useState, useEffect } from 'react'
import { TestHeader, Map, TestPane, TestNote, TestTime, AddButton } from '../components';
import { BsCloudSun } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { newNote, newTestSuite, newTime } from '../data/contants'
import DetailsPane from './DetailsPane';
import testApiService from '../api/testApi';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';
import { getTestType } from '../data/dataUtil';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const TestView = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const { tests, setTests, currentDemo, sceneMaps } = useStateContext();
    // should point to object id of scenario user has selected, first scenario by default
    const [selectedScenario, setSelectedScenario] = useState(null);
    // test suite local state object, gets copied to remote database when we click save
    const [test, setTest] = useState({});
    const { type, scenario, notes, timeline, time, weather, LogoClick } = test;
    // local test suite type state
    const [testType, setTestType] = useState();
    // whether or not the DetailsPane is shown
    const [showMore, setShowMore] = useState(false);

    const [saved, setSaved] = useState(false);
    const [showingAddNote, showAddNote] = useState(false);
    const [showingAddTime, showAddTime] = useState(false);

    const [scene, setCurrentScene] = useState(null)
    const [currentAction, setCurrentAction] = useState(null)

    useEffect(() => {
        if (sceneMaps && selectedScenario) {
            setCurrentScene(sceneMaps.find(s => s._id === selectedScenario))
            setCurrentAction(0)
        }
    }, [sceneMaps])

    useEffect(() => {
        createSpinner({
            target: document.getElementById("container")
        });
    }, [])

    // default selected scenario to the first test in the timeline
    useEffect(() => {
        setTestType(type)
        // if current sel scenario no longer exists, relocate to the first one again or set to null
        if (test.timeline) {
            let curr = test.timeline.find(t => t._id === selectedScenario)
            if (!curr) curr = test.timeline.find(t => t.tempid === selectedScenario)
            if (!curr) {
                if (!test.timeline.length) setSelectedScenario(null)
                else {
                    if (test.timeline[0]._id)
                        setSelectedScenario(test.timeline[0]._id)
                    else setSelectedScenario(test.timeline[0].tempid)
                }
            }
        }
        if (selectedScenario === null && test.timeline && test.timeline.length) {
            let id = test.timeline[0]._id;
            if (!id) id = test.timeline[0].tempid
            setSelectedScenario(id)
        }
        if (selectedScenario !== null && sceneMaps.length) {
            let timelineObj = test.timeline.find(t => t._id === selectedScenario)
            // timeline instance may just have been created... in this case we'll use temp id
            if (!timelineObj) timelineObj = test.timeline.find(t => t.tempid === selectedScenario);
            if (timelineObj && timelineObj.scene) {
                setCurrentScene(sceneMaps.find(s => s._id === timelineObj.scene))
                setCurrentAction(0)
            }
            else {
                setCurrentScene(null)
                setCurrentAction(null)
            }
        }
    }, [selectedScenario, test, sceneMaps])

    // query the data connected to that test
    useEffect(() => {
        if (!tests.length) {
            // it hasnt loaded yet, set a loading spinner until it does
            showSpinner(document.getElementById("container"))
        }
        else if (params.id) {
            setTest(tests.find(test => test._id.toString() === params.id));
            setSaved(true);
            hideSpinner(document.getElementById("container"))
        }
        else if (props.new) {
            setTest(newTestSuite);
            setShowMore(true);
            hideSpinner(document.getElementById("container"))
        }
        else if (params.id === undefined) {
            setTest(currentDemo);
            setSaved(true);
            hideSpinner(document.getElementById("container"))
        }

    }, [tests, params.id])

    const goToNextAction = () => {
        // if we are at the last action, don't go anywhere
        if (!(currentAction === scene.actions.length - 1))
            // otherwise proceed to the next action using idx of current action
            setCurrentAction(currentAction + 1)
    }

    const goToPreviousAction = () => {
        // if we are at the first action, don't go anywhere
        if (!(currentAction === 0))
            // otherwise proceed to the previous action using idx of current action
            setCurrentAction(currentAction - 1)
    }

    // types: sunny, partly cloudy, cloudy
    const getWeather = (weather) => {
        const color = "";
        const background = "rgb(254, 201, 15)";
        const icon = <BsCloudSun />;

        return (
            <div className="flex gap-4 my-4">
                <button
                    type="button"
                    style={{
                        color: color,
                        background: background
                    }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                >
                    {icon}
                </button>
                <div>
                    <p className="text-md font-semibold">{weather.type}</p>
                    <p className="text-sm text-gray-400">{`${weather.temperature}°F`}</p>
                </div>
            </div>
        )
    }

    const getLogoAndHeader = () => {
        const logo = getTestType(testType);
        return (
            <>
                <a
                    href={LogoClick}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        type="button"
                        style={{
                            color: logo.IconColor,
                            backgroundColor: logo.IconBg,
                        }}
                        className="text-2xl rounded-lg p-4 hover:drop-shadow-xl mb-10"
                    >
                        {logo.Icon}
                    </button>
                </a>
                <TestHeader
                    category={logo.Type}
                    categoryChange={(val) => {
                        setTestType(val)
                        setTest({
                            ...test,
                            type: val
                        })
                        setSaved(false)
                    }}
                    title={scenario}
                    titleChange={(val) => {
                        setTest({
                            ...test,
                            scenario: val
                        })
                        setSaved(false)
                    }}
                    showMore={showMore}
                    setShowMore={setShowMore}
                    saved={saved}
                    saveChanges={saveChanges}
                />
            </>
        )
    }

    // make api call creating / updating selected test
    const saveChanges = () => {
        if (props.new) {
            testApiService.create(test)
                .then(res => {
                    if (res) {
                        setTests([
                            ...tests,
                            res
                        ])
                        setSelectedScenario(null)
                        navigate('/tests/' + res._id)
                    }

                })
            // .catch(err => console.log("ERR", err));
        }
        else
            testApiService.update(test)
                .then(res => {
                    if (res)
                        setTests([
                            ...tests.filter(t => t._id !== test._id),
                            test
                        ])
                });
        setSaved(true);
    }

    const updateTest = (event, update, idx=null, field=null) => {
        let newTestObj;
        if (update === 'addTime') newTestObj = { time: [...time, newTime] };
        else if (update === 'removeTime') newTestObj = { time: test.time.filter((t, i) => i !== idx) };
        else if (update === 'addNote') newTestObj = { notes: [...test.notes, newNote] };
        else if (update === 'removeNote') newTestObj = { notes: test.notes.filter((n, i) => i !== idx) };
        else if (update === 'updateTime') newTestObj = { time: test.time.map((t, i) => i === idx ? { ...t, [field]: event.value } : t) };
        else if (update === 'updateNote') newTestObj = { notes: test.notes.map((n, i) => (i === idx ? event.value : n)) }
        setTest({
            ...test,
            ...newTestObj
        })
        setSaved(false);
    }

    const deleteTest = () => {
        testApiService.destroy(test)
            .then(res => {
                if (res) {
                    navigate('/tests/')
                    setTests([...tests.filter(t => t._id !== test._id)])
                }
            })
    }

    return (
        <div id="container" className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className='flex gap-4'>
                {getLogoAndHeader()}
            </div>
            {/* Everything Below header */}
            {showMore &&
                <DetailsPane
                    test={test}
                    setTest={setTest}
                    saved={saved}
                    setSaved={setSaved}
                    deleteTest={deleteTest}
                    isNew={props.new}
                />
            }
            <div className='flex gap-2 flex-wrap lg:flex-nowrap justify-center'>
                {/* Left column */}
                <div className='lg:w-2/3'>
                    {timeline && timeline.map((scen, idx) =>
                        <TestPane
                            scenario={scen}
                            isSelected={selectedScenario === scen._id}
                            setSelected={(test) => setSelectedScenario(test._id)}
                            testSuite={test}
                            setTest={setTest}
                            saved={saved}
                            setSaved={setSaved}
                            key={idx}
                        />
                    )}
                    <TestPane
                        isNewPane
                        testSuite={test}
                        setTest={setTest}
                        setSelected={(test) => setSelectedScenario(test._id)}
                        saved={saved}
                        setSaved={setSaved}
                        key={timeline && timeline.length}
                    />
                </div>
                {/* Right Column */}
                <div className='lg:w-1/3 flex-col'>
                    <div className='h-96 my-2'>
                        <div className='border-1 rounded-2xl p-1'>
                            {(currentAction !== null) && <Map height="380px" onResize={showMore}
                                scene={scene.actions[currentAction]}
                            />}
                        </div>
                    </div>
                    <div className='h-1/2 py-5 px-2'>
                        <div className=' flex py-5 px-2 items-center justify-center gap-3'>
                            <button
                                className='border-1 p-2 rounded-lg'
                                onClick={goToPreviousAction}
                            >
                                <MdNavigateBefore />
                            </button>
                            <button
                                className='border-1 p-2 rounded-lg'
                                onClick={goToNextAction}
                            >
                                <MdNavigateNext />
                            </button>
                        </div>
                        <div className='flex justify-between mb-5 pb-5 border-b-1'>
                            <p className='flex text-xl font-semibold items-center'>Current Scenario:</p>
                            <div className='border-1 rounded-lg p-2'>
                                <DropDownListComponent
                                    dataSource={timeline}
                                    fields={{ text: 'header' }}
                                    placeholder={timeline && timeline.find(t => t._id === selectedScenario || t.tempid === selectedScenario)?.header}
                                    change={(e) => {
                                        if (e.itemData) {
                                            if (e.itemData._id)
                                                setSelectedScenario(e.itemData._id)
                                            else
                                                setSelectedScenario(e.itemData.tempid)
                                        }
                                        else setSelectedScenario(null)
                                    }}
                                    value={timeline && timeline.find(t => t._id === selectedScenario || t.tempid === selectedScenario)?.header}
                                />
                            </div>
                        </div>
                        <p className='text-xl font-semibold mb-1'>Important Times</p>
                        {(!time || !time.length) && <AddButton onClick={(e) => updateTest(e, 'addTime')} />}
                        {time && time.map((t, idx) => {
                            const timeComp = (
                                <TestTime
                                    time={t}
                                    nameChange={(e) => updateTest(e, 'updateTime', idx, "name")}
                                    timeChange={(e) => updateTest(e, 'updateTime', idx, "time")}
                                    remove={(e) => updateTest(e, 'removeTime', idx)}
                                />);
                            if (idx === time.length - 1)
                                return (
                                    <div
                                        onMouseEnter={() => showAddTime(true)}
                                        onMouseLeave={() => showAddTime(false)}
                                    >
                                        {timeComp}
                                        {showingAddTime && <AddButton onClick={(e) => updateTest(e, 'addTime')} />}
                                    </div>
                                )
                            else return (timeComp)
                        })
                        }
                        {weather && getWeather(weather)}
                        <div className='py-5 border-y-1'>
                            <p className='text-xl font-semibold mb-5'>Notes:</p>
                            {(!notes || !notes.length) && <AddButton onClick={(e) => updateTest(e, 'addNote')} />}
                            {notes && notes.map((note, idx) => {
                                const noteComp = (<TestNote note={note} onChange={(e) => updateTest(e, 'updateNote', idx)} remove={(e) => updateTest(e, 'removeNote', idx)} />);
                                if (idx === notes.length - 1)
                                    return (
                                        <div
                                            onMouseEnter={() => showAddNote(true)}
                                            onMouseLeave={() => showAddNote(false)}
                                        >
                                            {noteComp}
                                            {showingAddNote && <AddButton onClick={(e) => updateTest(e, 'addNote')} />}
                                        </div>
                                    )
                                else return (noteComp)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestView;