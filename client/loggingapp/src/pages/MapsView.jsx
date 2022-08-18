import React, { useState, useEffect } from 'react'
import { TestHeader, Map, MapsPane } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { getMapLogo } from '../data/dataUtil';
import { newMapsPane } from '../data/contants';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import mapsApiService from '../api/mapsApi';

const MapsView = (props) => {
    const { sceneMaps, setSceneMaps } = useStateContext();
    const navigate = useNavigate();
    const params = useParams();
    const [saved, setSaved] = useState(false);
    const [scene, setScene] = useState(null);
    const [selectedAction, setSelectedAction] = useState(0);

    // default selected scenario to the first test in the timeline
    useEffect(() => {
        if (selectedAction === null && scene.actions.length)
            setSelectedAction(0)
    }, [selectedAction, scene])

    // query the data connected to that scene
    useEffect(() => {
        if (!sceneMaps.length) {
            //todo loading spinner
        }
        else if (params.id) {
            setScene(sceneMaps.find(s => s._id.toString() === params.id));
            setSaved(true);
        }
        else if (props.new) {
            // set scene new test scene
            setScene({name : 'New Scene', actions: [newMapsPane]});
        }
        else if (params.id === undefined) {
            // setTest(currentDemo);
            setSaved(true);
        }
        
    }, [sceneMaps])
    //fixme this will be scenes and params.id not just params id

    const getLogoAndHeader = () => {
        if (!scene) return <></>
        const logo = getMapLogo(props.new);
        return (
            <>
                <a>
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
                    disableChange
                    hasDetails={false}
                    hasRemoveButton={!props.new}
                    deleteTest={removeScene}
                    title={scene.name}
                    titleChange={(val) => {
                        setScene({
                            ...scene,
                            name: val
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
        if (props.new) {
            mapsApiService.create(scene)
                .then(res => {
                    if (res) {
                        setSceneMaps([
                            ...sceneMaps,
                            res
                        ])
                        navigate('/maps/' + res._id)
                    }
                })
            // .catch(err => console.log("ERR", err));
        }
        else
            mapsApiService.update(scene)
                .then(res => {
                    if (res)
                        setSceneMaps([
                            ...sceneMaps.filter(s => s._id !== scene._id),
                            scene
                        ])
                });
        setSaved(true);
    }

    const removeScene = () => {
        mapsApiService.destroy(scene)
            .then(res => {
                if (res) {
                    setSceneMaps([...sceneMaps.filter(s => s._id !== scene._id )])
                    navigate('/maps')
                }
            })
    }

    const goToNextAction = () => {
        // if we are at the last action, don't go anywhere
        if (!(selectedAction === scene.actions.length - 1))
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

            <div className='flex gap-2 flex-wrap lg:flex-nowrap justify-center'>
                {/* Left column */}
                <div className='lg:w-2/3'>
                    {(scene &&scene.actions) && scene.actions.map((action, idx) =>
                        <MapsPane
                            action={action}
                            isSelected={selectedAction === scene.actions.indexOf(action)}
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
                            setSelectedAction(a)}}
                        saved={saved}
                        setSaved={setSaved}
                        key={scene && scene.length}
                    />
                </div>
                {/* Right Column */}
                <div className='lg:w-1/3 flex-col'>
                    <div className='h-96 my-2'>
                        {(scene && scene.actions.length) ? ( 
                        <div className='border-1 rounded-2xl p-1'>
                            {scene.actions[selectedAction] && <Map height="380px" scene={scene.actions[selectedAction]} />}
                        </div>) : <></>}
                    </div>
                    <div className=' flex py-5 px-2 items-center justify-center gap-3'>
                        <button
                            className='border-1 p-2 rounded-lg'
                            onClick={goToPreviousAction}
                        >
                            <MdNavigateBefore />
                        </button>
                        {scene && scene.actions[selectedAction] && scene.actions[selectedAction].header}
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