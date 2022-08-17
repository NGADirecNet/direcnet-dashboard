import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import React, { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi';
import { MdDeleteForever, MdModeEditOutline } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import dashApiService from '../../api/dashApi';
import EditableTextField from '../EditableTextField';


const SyncPane = ({ item, itemIdx }) => {
    const { dashInfo, setDashInfo } = useStateContext();
    const [dropdown, setDropdown] = useState();
    const [editStatus, setEditStatus] = useState(false);
    const showDrop = () => setEditStatus(true);
    const hideDrop = () => setEditStatus(false);
    const [showEditLink, setShowEditLink] = useState(false);
    const [showLinkField, setShowLinkField] = useState(false);
    const [inputObj, setInputObj] = useState();

    const [showRemoveButton, setShowRemoveButton] = useState(false)

    const fieldShow = () => {
        setShowEditLink(false);
        setShowLinkField(true);
    }

    const fieldHide = () => {
        setShowLinkField(false);
        // setShowEditLink(true);
    }

    const showButton = () => setShowEditLink(true);
    const hideButton = () => {
        // setTimeout(() => {
        setShowEditLink(false);
        // }, [1000])
    }

    const showRemove = () => setShowRemoveButton(true);
    const hideRemove = () => setShowRemoveButton(false);

    const updatePane = (e, field) => {
        if (field !== 'link' && !e.value) return;
        let newDashInfo = {
          ...dashInfo, 
          sync: [...dashInfo.sync.map((s, i) => (i === itemIdx ? { ...s, [field]: e.value } : s) )]
        }
        if (field === 'assignees') {
            newDashInfo = {
                ...dashInfo,
                sync: [...dashInfo.sync.map((s, i) => (i === itemIdx ? { ...s, assignees: e.value.split(', ') } : s) )]
            }
        }
        setDashInfo(newDashInfo);
        dashApiService.update(newDashInfo);
        if (field === 'status') hideDrop();
    }

    const removePane = () => {
        const newDashInfo = {
            ...dashInfo,
            sync: [...dashInfo.sync.filter((s, i) => (i !== itemIdx))]
        }
        setDashInfo(newDashInfo)
        dashApiService.update(newDashInfo);
    }

    const getStatus = () => {
        const color = item.status === 'Complete' ? '#8BE78B' 
            : item.status === 'In Progress' ? '#FEC90F'
                : item.status === 'Ready for Testing' ? 'orange'
                    : 'rgb(228, 106, 118)'
        return (
            <div
                className="flex gap-2 justify-center items-center text-gray-700 capitalize border-1 rounded-lg p-1 border-white hover:border-gray-100"
                onClick={showDrop}
            >
                {editStatus ?
                    (<DropDownListComponent
                        width={"150px"}
                        popupWidth="200px"
                        dataSource={['Complete', 'In Progress', 'Ready for Testing', 'Backlog']}
                        //fields
                        placeholder={item.status}
                        change={(e) => updatePane(e, 'status')}
                        ref={(drop) => setDropdown(drop)}
                        created={() => dropdown.focusIn(true)}
                        blur={hideDrop}
                    />)
                    : (<>
                        <p style={{ background: color }} className="rounded-full h-3 w-3" />
                        <p className='text-sm pr-2'>{item.status}</p>
                    </>)
                }
            </div >
        );
    }

    return (<div className='flex gap-1'  onMouseEnter={showRemove} onMouseLeave={hideRemove}>
        <div key={item.title} className="flex justify-between mb-4 w-full border-1 rounded-lg">
            <div className="flex gap-4">
                <div>
                    <EditableTextField
                        placeholder={item.title}
                        className="text-md font-semibold p-2 pb-2 px-2"
                        onChange={(e) => updatePane(e, 'title')}
                    />
                    <EditableTextField
                        placeholder={item.assignees.join(', ')}
                        className="text-sm text-gray-400 p-2 px-2"
                        onChange={(e) => updatePane(e, 'assignees')}
                    />
                </div>
            </div>
            <div className='flex flex-col items-end gap-3' onMouseEnter={showButton} onMouseLeave={hideButton}>
                <div className='flex gap-3 w-full justify-end h-full'>
                    {showLinkField &&
                        <TextBoxComponent
                            change={(e) => {updatePane(e, 'link');fieldHide()}}
                            ref={text => setInputObj(text)}
                            created={() => inputObj.focusIn(true)}
                            blur={fieldHide}
                            value={item.link}
                            width='200px'
                        />}
                    {showEditLink && <button
                        type='button'
                        className='text-xl font-semibold p-2 border-1 rounded-lg border-white hover:border-gray-100'
                        onMouseEnter={showButton}
                        onClick={fieldShow}
                    >
                        <MdModeEditOutline />
                    </button>}
                    {item.link ? <button
                        type='button'
                        className='text-xl text-blue-600 font-semibold p-2 border-1 rounded-lg border-white hover:border-gray-100'
                        // onMouseEnter={showButton}
                        // onMouseLeave={hideButton}
                        onClick={() => window.open(item.link)}
                    >
                        <FiExternalLink />
                    </button> : (<button className='text-xl text-blue-600 font-semibold p-2 border-1 rounded-lg border-white hover:border-gray-100'
                    ></button>)}
                </div>
                {getStatus()}
            </div>
        </div>
    {showRemoveButton && <button type='button' onClick={removePane} className='hover: text-red-600'><MdDeleteForever /></button>}
    </div>);
}

export default SyncPane;