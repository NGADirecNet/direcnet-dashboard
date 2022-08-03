import React, { useState, useEffect } from 'react'
import { TestHeader, Map, TestPane, TestNote, TestTime } from '../components';
import { BsCloudSun } from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { outdoorLogo, indoorLogo, emaneLogo, demoLogo, newLogo } from '../data/dashLogos'
import DetailsPane from './DetailsPane';
import testApiService from '../testApi';
import { IoMdAdd } from 'react-icons/io';

const TestView = (props) => {
    // The selected test that we model on the right hand map, first test by default
    const [selectedScenario, setSelectedScenario] = useState(null)
    const [test, setTest] = useState({});
    const params = useParams();
    const { tests, setTests, currentDemo } = useStateContext();
    const { type, scenario, notes, timeline, time, weather, LogoClick, demo } = test;
    const [testType, setTestType] = useState();
    const [showMore, setShowMore] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showingAddNote, showAddNote] = useState(false);
    const [showingAddTime, showAddTime] = useState(false);

    // default selected scenario to the first test in the timeline
    useEffect(() => {
        console.log("test", test)
        setTestType(type)
        if (selectedScenario === null && test.timeline)
            setSelectedScenario(test.timeline[0].header)
    }, [selectedScenario, test])

    // if no id supplied, we are in /demo, otherwise check for which test we are in
    // and query the data connected to that test
    useEffect(() => {
        console.log("params id", params.id)
        if (props.new) {
            setTest({
                commit: "",
                date: null,
                location: "",
                notes: [],
                scenario: "New Scenario",
                status: "in progress",
                time: {},
                timeline: [{
                    header: "New Header",
                    subheader: "New Subheader",
                    setup: [{
                        name: "New Node",
                        description: "Node setup"
                    }],
                    events: [{
                        time: "00:00 AM",
                        description: "New event"
                    }],
                    attachments: []
                }],
                type: "new"
            });
            setShowMore(true);
        }
        else if (params.id === undefined) {
            setTest(currentDemo);
            setSaved(true);
        }
        else {
            setTest(tests.find(test => test._id.toString() === params.id));
            setSaved(true);
        }
    }, [])

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

    const getLogoAndHeader = (isDemo) => {
        const logo = isDemo ? { ...demoLogo }
            : testType === 'outdoor' ? { ...outdoorLogo }
                : testType === 'indoor' ? { ...indoorLogo }
                    : testType === 'emane' ? { ...emaneLogo }
                        : { ...newLogo }

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
                    if (res.status === 200)
                        setTests([
                            ...tests,
                            test
                        ])
                })
                .catch(err => console.log("ERR", err));
        }
        else
            testApiService.update(test)
                .then(res => {
                    if (res.status === 200)
                        setTests([
                            ...tests.filter(t => t._id !== test._id),
                            test
                        ])
                });
        setSaved(true);
    }

    const addNote = () => {
        setTest({
            ...test,
            notes: [...test.notes, "New Note..."]
        })
        setSaved(false);
    }

    const noteChange = (event, idx) => {
        setTest({
            ...test,
            notes: test.notes.map((n, i) => (i === idx ? event.value : n))
        })
        setSaved(false);
    }

    const removeNote = (idx) => {
        console.log("removing note")
        setTest({
            ...test,
            notes: test.notes.filter((n, i) => i !== idx)
        })
        setSaved(false);
    }

    const addTime = () => {
        console.log("time added")
        setTest({
            ...test,
            time: [...time, {name: "New Time", time: "00:00AM"}]
        });
        setSaved(false);
    }

    const updateTime = (event, idx, field) => {
        console.log("updating time")
        if (field === 'name' || field === 'time') {
            setTest({
                ...test,
                time: test.time.map((t, i) => i === idx ? { ...t, [field] : event.value } : t)
            })
            setSaved(false);
        }
        else {
            // we have a problem
        }
    }

    const removeTime = (idx) => {
        console.log("removing time")
        setTest({
            ...test,
            time: test.time.filter((t, i) => i !== idx)
        })
        setSaved(false)
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className='flex gap-4'>
                {getLogoAndHeader(demo)}
            </div>
            {/* Everything Below header */}
            {showMore &&
                <DetailsPane
                    test={test}
                    setTest={setTest}
                    saved={saved}
                    setSaved={setSaved}
                />
            }
            <div className='flex gap-2'>
                {/* Left column */}
                <div className='w-2/3'>
                    {timeline && timeline.map((currTest, idx) =>
                        <TestPane
                            test={currTest}
                            isSelected={selectedScenario === currTest.header}
                            setSelected={(test) => setSelectedScenario(test.header)}
                            testSuite={test}
                            setTest={setTest}
                            saved={saved}
                            setSaved={setSaved}
                        />
                    )}
                    <TestPane
                        newPane
                        testSuite={test}
                        setTest={setTest}
                        setSelected={(test) => setSelectedScenario(test.header)}
                        saved={saved}
                        setSaved={setSaved}
                    />
                </div>
                {/* Right Column */}
                <div className='w-1/3 flex-col'>
                    <div className='h-96 my-2'>
                        <div className='border-1 rounded-2xl p-1'>
                            {/* <Map height="380px" /> */}
                        </div>
                    </div>
                    <div className='h-1/2 py-5 px-2'>
                        <p className='text-xl font-semibold mb-5 pb-5 border-b-1'>Current Scenario: {selectedScenario}</p>
                        <p className='text-xl font-semibold mb-1'>Important Times</p>
                        {time && time.map((t, idx) => {
                            if (idx === time.length - 1)
                                return (
                                    <div
                                        onMouseEnter={() => showAddTime(true)}
                                        onMouseLeave={() => showAddTime(false)}
                                    >
                                        <TestTime
                                            time={t}
                                            nameChange={(e) => updateTime(e, idx, "name")}
                                            timeChange={(e) => updateTime(e, idx, "time")}
                                            remove={() => removeTime(idx)}
                                        />
                                        {showingAddTime &&
                                            <div
                                                className='flex justify-center p-3 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-1'
                                                onClick={addTime}
                                            >
                                                <IoMdAdd />
                                            </div>}
                                    </div>
                                )
                            else return (
                                <TestTime
                                    time={t}
                                    nameChange={(e) => console.log("name change", e)}
                                    timeChange={(e) => console.log("time change", e)}
                                    remove={() => removeTime(idx)}
                                />
                            )
                        })
                        }
                        {weather &&
                            getWeather(weather)
                        }
                        <div className='py-5 border-y-1'>
                            <p className='text-xl font-semibold mb-5'>Notes:</p>
                            {(!notes || !notes.length) &&
                                <div
                                    className='flex justify-center p-3 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-1'
                                    onClick={addNote}
                                >
                                    <IoMdAdd />
                                </div>
                            }
                            {notes && notes.map((note, idx) => {
                                if (idx === notes.length - 1)
                                    return (
                                        <div
                                            onMouseEnter={() => showAddNote(true)}
                                            onMouseLeave={() => showAddNote(false)}
                                        >
                                            <TestNote note={note} onChange={(e) => noteChange(e, idx)} remove={() => removeNote(idx)} />
                                            {showingAddNote &&
                                                <div
                                                    className='flex justify-center p-3 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-1'
                                                    onClick={addNote}
                                                >
                                                    <IoMdAdd />
                                                </div>}
                                        </div>
                                    )
                                else return (<TestNote note={note} onChange={(e) => noteChange(e, idx)} remove={() => removeNote(idx)} />)
                            })}
                        </div>
                        {/* <div className='py-5 border-y-1'> */}
                        {/* <p className='text-xl font-semibold mb-5'>Extras:</p> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestView;