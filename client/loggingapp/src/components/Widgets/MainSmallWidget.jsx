import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { getTime } from '../../data/smallWidgetUtil';
import atlassianApiService from '../../api/atlassianApi';
import { BsCheck2 } from 'react-icons/bs';

const ChangeSmallWidget = () => {
    const navigate = useNavigate();
    const [dropObj, setDropObj] = useState();
    const [dropData, setDropData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selCommit, setSelCommit] = useState({
        displayId: '',
        message: ''
    })
    const [item, setItem] = useState({
        ...getTime(new Date().toLocaleDateString('en-US'), '- Main Branch', 'main'),
        externallink: 'https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/commits/',
        author: ''
    })
    // holds state for values returned from getCommits call
    const [commits, setCommits] = useState([])


    // for when currBranch changes, make api call for that branch
    useEffect(() => {
        atlassianApiService.getCommits('main')
            .then(res => {
                setCommits(res.values)
            })
    }, [])

    // for when commits change, update our widgets display properties
    useEffect(() => {
        if (commits && commits.length) {
            const mostRecent = commits[0]
            setItem({
                ...getTime(mostRecent.authorTimestamp, '- Main Branch', mostRecent.displayId.slice(0, 7)),
                externallink: 'https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/commits/' + mostRecent.id,
                author: mostRecent.author.displayName
            })
            setSelCommit(commits[0])
            setDropData(commits.map(commit => commit.displayId))
        }
    }, [commits])

    function changeCommit(event) {
        const com = commits.find(c => c.displayId === event.itemData.value)
        // set curr branch
        setItem({
            ...getTime(com.authorTimestamp, '- Main Branch', com.displayId),
            externallink: 'https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/commits/' + com.id,
            author: com.author.displayName
        })
        setSelCommit(com)
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
                    style={{ color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)' }}
                    className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    onClick={() => (item.link && navigate(item.link)) || (item.externallink && window.open(item.externallink))}
                >
                    <BsCheck2 />
                </button>
                <div onClick={() => setEditMode(true)}>
                    {editMode ? (
                        <DropDownListComponent
                            dataSource={dropData}
                            popupWidth={"300px"}
                            placeholder={selCommit.displayId}
                            change={changeCommit}
                            ref={(drop) => setDropObj(drop)}
                            created={() => dropObj.focusIn(true)}
                            blur={() => setEditMode(false)}
                        />) : (
                        <>
                            <p className='text-xs text-gray-400'>{selCommit.message.slice(0, 25) + '...'}</p>
                            <p className='text-xs text-gray-400 font-bold'>{item.author}</p>
                        </>
                    )}
                </div>
            </div>
            <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-green-600 ml-2`}>
                    {item.time}
                </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">{item.title}</p>
        </div>
    )
}

export default ChangeSmallWidget