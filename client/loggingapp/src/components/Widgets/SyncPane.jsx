import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import React, { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi';
import { MdModeEditOutline } from 'react-icons/md';
import EditableTextField from '../EditableTextField';


const SyncPane = ({ item }) => {

    const [dropdown, setDropdown] = useState();
    const [editStatus, setEditStatus] = useState(false);
    const showDrop = () => setEditStatus(true);
    const hideDrop = () => setEditStatus(false);
    const [showEditLink, setShowEditLink] = useState(false);
    const [showLinkField, setShowLinkField] = useState(false);
    const [inputObj, setInputObj] = useState();
    const link = 'https://cuse-atlassian.alionscience.com:8443/secure/RapidBoard.jspa?rapidView=92&projectKey=DNET&view=detail&selectedIssue=DNET-346'

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

    const getStatus = () => {
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
                        placeholder={'Complete'}
                        change={(e) => console.log("STATUS CHANGE", e)}
                        ref={(drop) => setDropdown(drop)}
                        created={() => dropdown.focusIn(true)}
                        blur={hideDrop}
                    />)
                    : (<>
                        <p style={{ background: '#8BE78B' }} className="rounded-full h-3 w-3" />
                        <p className='text-sm pr-2'>{"Complete"}</p>
                    </>)
                }
            </div >
        );
    }

    return (
        <div key={item.title} className="flex justify-between mb-4 w-full border-1 rounded-lg">
            <div className="flex gap-4">
                <div>
                    <EditableTextField
                        placeholder={item.title}
                        className="text-md font-semibold p-2 pb-2 px-2"
                        onChange={(e) => console.log("title change", e)}
                    />
                    <EditableTextField
                        placeholder={item.desc}
                        className="text-sm text-gray-400 p-2 px-2"
                        onChange={(e) => console.log("people change", e)}
                    />
                </div>
            </div>
            <div className='flex flex-col items-end gap-3' onMouseEnter={showButton} onMouseLeave={hideButton}>
                <div className='flex gap-3 w-full justify-end'>
                    {showLinkField &&
                        <TextBoxComponent
                            change={() => console.log("link change")}
                            ref={text => setInputObj(text)}
                            created={() => inputObj.focusIn(true)}
                            blur={fieldHide}
                            value={link}
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
                    <button
                        type='button'
                        className='text-xl text-blue-600 font-semibold p-2 border-1 rounded-lg border-white hover:border-gray-100'
                        // onMouseEnter={showButton}
                        // onMouseLeave={hideButton}
                        onClick={() => window.open(link)}
                    >
                        <FiExternalLink />
                    </button>
                </div>
                {getStatus()}
            </div>
        </div>
    );
}

export default SyncPane;