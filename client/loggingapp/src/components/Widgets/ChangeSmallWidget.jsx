import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { getTime } from '../../data/smallWidgetUtil';
import { DiGitBranch } from 'react-icons/di';
import { useStateContext } from '../../contexts/ContextProvider';
import atlassianApiService from '../../atlassianApi';

const ChangeSmallWidget = () => {
    const navigate = useNavigate();
    const { branches } = useStateContext();
    const [dropObj, setDropObj] = useState();
    const [dropData, setDropData] = useState([]);
    const [currBranch, setCurrBranch] = useState("")
    const [editMode, setEditMode] = useState(false);
    const [item, setItem] = useState({
        ...getTime('', 'Software Change', ''),
        externallink: '',
        author: ''
    })
    // holds state for values returned from getCommits call
    const [commits, setCommits] = useState([])

    // for when we get branches from remote api
    useEffect(() => {
        if (branches && branches.length) {
            setDropData(branches.map(branch => branch.displayId))
            setCurrBranch(branches[0].displayId)
        }
    }, [branches])

    // for when currBranch changes, make api call for that branch
    useEffect(() => {
        atlassianApiService.getCommits(currBranch)
            .then(res => {
                setCommits(res.values)
            })
    }, [currBranch])

    // for when commits change, update our widgets display properties
    useEffect(() => {
        if (commits.length) {
            const mostRecent = commits[0]
            setItem({
                ...getTime(mostRecent.authorTimestamp, 'Software Change', mostRecent.displayId.slice(0, 7)),
                externallink: 'https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/commits/' + mostRecent.id,
                author: mostRecent.author.displayName
            })
        }
    }, [commits])

    function changeBranch(event) {
        // set curr branch
        setCurrBranch(event.itemData.value)
        // turn off dropdown
        setEditMode(false)
    }

    return (
        <div
            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-52  p-4 pt-9 rounded-2xl "
            key={item.title}
        >
            <div className='flex gap-2 items-center'>
                <button
                    type="button"
                    style={{ color: 'rgb(228, 106, 118)', backgroundColor: 'rgb(255, 244, 229)' }}
                    className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    onClick={() => (item.link && navigate(item.link)) || (item.externallink && window.open(item.externallink))}
                >
                    <DiGitBranch />
                </button>
                <div onClick={() => setEditMode(true)}>
                    {editMode ? (
                        <DropDownListComponent
                            dataSource={dropData}
                            popupWidth={"300px"}
                            placeholder={currBranch}
                            change={changeBranch}
                            ref={(drop) => setDropObj(drop)}
                            created={() => dropObj.focusIn(true)}
                            blur={() => setEditMode(false)}
                        />) : (
                        <>
                            <p className='text-xs text-gray-400'>
                                {currBranch.split('/')[1] ? currBranch.split('/')[1] : currBranch.split('/')[0]}
                            </p>
                            <p className='text-xs text-gray-400 font-bold'>{item.author}</p>
                        </>
                    )}
                </div>
            </div>
            <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-red-600 ml-2`}>
                    {item.time}
                </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">{item.title}</p>
        </div>
    )
}

export default ChangeSmallWidget