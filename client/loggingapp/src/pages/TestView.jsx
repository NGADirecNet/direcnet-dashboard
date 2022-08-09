import React, { useState, useEffect } from 'react'
import { TestHeader, Map, TestPane, TestNote, TestTime, AddButton } from '../components';
import { BsCloudSun } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { newNote, newTestSuite, newTime } from '../data/contants'
import DetailsPane from './DetailsPane';
import testApiService from '../testApi';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';
import { getTestType } from '../data/dataUtil';

const TestView = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const { tests, setTests, currentDemo } = useStateContext();
    // The selected scenario that we model on the right hand map, first scenario by default
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

    useEffect(() => {
        createSpinner({
            target: document.getElementById("container")
        });
    }, [])

    // default selected scenario to the first test in the timeline
    useEffect(() => {
        // console.log("test", test)
        setTestType(type)
        if (selectedScenario === null && test.timeline)
            setSelectedScenario(test.timeline[0].header)
    }, [selectedScenario, test])

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
                        navigate('/test/' + res._id)
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

    const addNote = () => {
        setTest({
            ...test,
            notes: [...test.notes, newNote]
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
        setTest({
            ...test,
            notes: test.notes.filter((n, i) => i !== idx)
        })
        setSaved(false);
    }

    const addTime = () => {
        setTest({
            ...test,
            time: [...time, newTime]
        });
        setSaved(false);
    }

    const updateTime = (event, idx, field) => {
        if (field === 'name' || field === 'time') {
            setTest({
                ...test,
                time: test.time.map((t, i) => i === idx ? { ...t, [field]: event.value } : t)
            })
            setSaved(false);
        }
        else {
            // we have a problem
        }
    }

    const removeTime = (idx) => {
        setTest({
            ...test,
            time: test.time.filter((t, i) => i !== idx)
        })
        setSaved(false)
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
                />
            }
            <div className='flex gap-2'>
                {/* Left column */}
                <div className='w-2/3'>
                    {timeline && timeline.map((scen, idx) =>
                        <TestPane
                            scenario={scen}
                            isSelected={selectedScenario === scen.header}
                            setSelected={(test) => setSelectedScenario(test.header)}
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
                        setSelected={(test) => setSelectedScenario(test.header)}
                        saved={saved}
                        setSaved={setSaved}
                        key={timeline && timeline.length}
                    />
                </div>
                {/* Right Column */}
                <div className='w-1/3 flex-col'>
                    <div className='h-96 my-2'>
                        <div className='border-1 rounded-2xl p-1'>
                            <Map height="380px" onResize={showMore} />
                        </div>
                    </div>
                    <div className='h-1/2 py-5 px-2'>
                        <div className='flex justify-between mb-5 pb-5 border-b-1'>
                            <p className='flex text-xl font-semibold items-center'>Current Scenario:</p>
                            <div className='border-1 rounded-lg p-2'>
                                <DropDownListComponent
                                    dataSource={timeline && timeline.map(s => s.header)}
                                    placeholder={selectedScenario}
                                    change={(e) => setSelectedScenario(e.itemData.value)}
                                    value={selectedScenario}
                                />
                            </div>
                        </div>
                        <p className='text-xl font-semibold mb-1'>Important Times</p>
                        {(!time || !time.length) && <AddButton onClick={addTime} />}
                        {time && time.map((t, idx) => {
                            const timeComp = (
                                <TestTime
                                    time={t}
                                    nameChange={(e) => updateTime(e, idx, "name")}
                                    timeChange={(e) => updateTime(e, idx, "time")}
                                    remove={() => removeTime(idx)}
                                />);
                            if (idx === time.length - 1)
                                return (
                                    <div
                                        onMouseEnter={() => showAddTime(true)}
                                        onMouseLeave={() => showAddTime(false)}
                                    >
                                        {timeComp}
                                        {showingAddTime && <AddButton onClick={addTime} />}
                                    </div>
                                )
                            else return (timeComp)
                        })
                        }
                        {weather && getWeather(weather)}
                        <div className='py-5 border-y-1'>
                            <p className='text-xl font-semibold mb-5'>Notes:</p>
                            {(!notes || !notes.length) && <AddButton onClick={addNote} />}
                            {notes && notes.map((note, idx) => {
                                const noteComp = (<TestNote note={note} onChange={(e) => noteChange(e, idx)} remove={() => removeNote(idx)} />);
                                if (idx === notes.length - 1)
                                    return (
                                        <div
                                            onMouseEnter={() => showAddNote(true)}
                                            onMouseLeave={() => showAddNote(false)}
                                        >
                                            {noteComp}
                                            {showingAddNote && <AddButton onClick={addNote} />}
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