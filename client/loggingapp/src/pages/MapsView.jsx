import React, { useState, useEffect } from 'react'
import { TestHeader, Map, TestPane, TestNote, TestTime, AddButton, MapsPane } from '../components';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { getMapLogo } from '../data/dataUtil';
import { newMapsPane } from '../data/contants';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const MapsView = (props) => {
    const params = useParams();
    const [saved, setSaved] = useState(false);
    const [scene, setScene] = useState([]);
    const [selectedAction, setSelectedAction] = useState(0);

    // default selected scenario to the first test in the timeline
    useEffect(() => {
        console.log("SCENE", scene)
        console.log('sel ac', selectedAction)
        console.log("sel", scene[selectedAction])
        if (selectedAction === null && scene.length)
            setSelectedAction(0)
    }, [selectedAction, scene])

    // query the data connected to that scene
    useEffect(() => {
        /*if (!scenes.length) {

        }
        else*/ if (params.id) {
            // setTest(tests.find(test => test._id.toString() === params.id));
            // set scene scenes . find from db
            setSaved(true);
        }
        else if (props.new) {
            // setTest(newTestSuite);
            // set scene new test scene
            setScene([newMapsPane]);
        }
        else if (params.id === undefined) {
            // setTest(currentDemo);
            setSaved(true);
        }
        
    }, [])
    //fixme this will be scenes and params.id not just params id

    const getLogoAndHeader = () => {
        const logo = getMapLogo();
        return (
            <>
                <a
                    href={''}
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
                    // categoryChange={(val) => {
                    //     setTestType(val)
                    //     setTest({
                    //         ...test,
                    //         type: val
                    //     })
                    //     setSaved(false)
                    // }}
                    hasDetails={false}
                    title={scene.header}
                    titleChange={(val) => {
                        setScene({
                            ...test,
                            header: val
                        });
                        setSaved(false);
                    }}
                    saved={saved}
                    saveChanges={saveChanges}
                />
            </>
        )
    }

    // make api call creating / updating map scene
    const saveChanges = () => {
        // if (props.new) {
        //     testApiService.create(test)
        //         .then(res => {
        //             if (res) {
        //                 setTests([
        //                     ...tests,
        //                     res
        //                 ])
        //                 navigate('/test/' + res._id)
        //             }

        //         })
        //     // .catch(err => console.log("ERR", err));
        // }
        // else
        //     testApiService.update(test)
        //         .then(res => {
        //             if (res)
        //                 setTests([
        //                     ...tests.filter(t => t._id !== test._id),
        //                     test
        //                 ])
        //         });
        // setSaved(true);
        console.log("saving map scene");
    }

    const goToNextAction = () => {
        // if we are at the last action, don't go anywhere
        if (!(selectedAction === scene.length - 1))
        // otherwise proceed to the next action using idx of current action
            setSelectedAction(selectedAction + 1)
    }

    const goToPreviousAction = () => {
        // if we are at the first action, don't go anywhere
        if (!(selectedAction === 0))
            // otherwise proceed to the previous action using idx of current action
            setSelectedAction(selectedAction - 1)
    }

    return (
        <div id="container" className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className='flex gap-4'>
                {getLogoAndHeader()}
            </div>
            {/* Everything Below header */}

            <div className='flex gap-2'>
                {/* Left column */}
                <div className='w-2/3'>
                    {scene && scene.map((action, idx) =>
                        <MapsPane
                            action={action}
                            isSelected={selectedAction === scene.indexOf(action)}
                            setSelected={(a) => setSelectedAction(a)}
                            scene={scene}
                            setScene={setScene}
                            saved={saved}
                            setSaved={setSaved}
                            key={idx}
                        />
                    )}
                    <MapsPane
                        isNewPane
                        scene={scene}
                        setScene={setScene}
                        setSelected={(a) => {
                            console.log(a)
                            setSelectedAction(a)}}
                        saved={saved}
                        setSaved={setSaved}
                        key={scene && scene.length}
                    />
                </div>
                {/* Right Column */}
                <div className='w-1/3 flex-col'>
                    <div className='h-96 my-2'>
                        {scene.length && 
                        <div className='border-1 rounded-2xl p-1'>
                            {scene[selectedAction] && <Map height="380px" scene={scene[selectedAction]} />}
                        </div>}
                    </div>
                    <div className=' flex py-5 px-2 items-center justify-center gap-3'>
                        <button
                            className='border-1 p-2 rounded-lg'
                            onClick={goToPreviousAction}
                        >
                            <MdNavigateBefore />
                        </button>
                        {scene[selectedAction] && scene[selectedAction].header}
                        <button 
                            className='border-1 p-2 rounded-lg'
                            onClick={goToNextAction}
                        >
                            <MdNavigateNext />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapsView;