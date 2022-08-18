import React, { useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import EditableTextField from './EditableTextField';
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri';
import { useStateContext } from '../contexts/ContextProvider';
import { FaRegSave } from 'react-icons/fa';

const dropdownItems = [
    { "Name": "Outdoor Test", "value": "outdoor" },
    { "Name": "Indoor Test", "value": "indoor" },
    { "Name": "EMANE", "value": "emane" },
    { "Name": "DEMO", "value": "demo" }
]

const TestHeader = ({ category, categoryChange, title, titleChange, showMore, setShowMore, saved, saveChanges, hasDetails = true, disableChange = false, hasRemoveButton, deleteTest }) => {
    const [dropdown, setDropdown] = useState()
    const [editCategory, setEditCategory] = useState(false);
    const { currentColor } = useStateContext();
    const showDrop = () => setEditCategory(true)
    const hideDrop = () => setEditCategory(false)

    const [confirmDelete, setConfirmDelete] = useState(false);

    const onCatChange = (event) => {
        categoryChange(event.itemData.value)
        hideDrop()
    }

    return (
        <div className='flex w-full justify-between'>
            <div className=" mb-10">
                <div onClick={showDrop}>
                    {disableChange ? (<p className='text-lg text-gray-400'>{category}</p>) :
                        (editCategory ?
                            (<DropDownListComponent
                                popupWidth="200px"
                                dataSource={dropdownItems}
                                fields={{ text: 'Name' }}
                                placeholder={category}
                                change={onCatChange}
                                ref={(drop) => setDropdown(drop)}
                                created={() => dropdown.focusIn(true)}
                                blur={hideDrop}
                            />) :
                            (<p className="text-lg text-gray-400">{category}</p>)
                        )
                    }

                </div>
                <EditableTextField
                    placeholder={title}
                    className="text-3xl font-extrabold tracking-tight text-slate-900"
                    onChange={(event) => titleChange(event.value)}
                />

            </div>
            <div className='space-y-1'>
                {hasRemoveButton &&
                    (confirmDelete ? (<button onBlur={() => setConfirmDelete(false)} onClick={deleteTest}
                        style={{
                            color: 'rgb(0, 194, 146)',
                            backgroundColor: 'rgb(235, 250, 242)',
                        }}
                        className='font-bold border-1 border-green-600 p-2 rounded-lg'>
                        Confirm Delete
                    </button>)
                        : (<button onClick={() => setConfirmDelete(true)}
                            style={{
                                color: 'rgb(228, 106, 118)',
                                backgroundColor: 'rgb(255, 244, 229)',
                            }}
                            className='font-bold border-1 border-red-600 p-2 rounded-lg'>
                            Delete Scene
                        </button>))}
                {hasDetails &&
                    <div
                        className='h-10 p-2 flex justify-center items-center gap-5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray cursor-pointer border-1'
                        onClick={() => setShowMore(prev => !prev)}
                    >
                        {showMore ? <RiArrowDropDownLine /> : <RiArrowDropRightLine />}
                        <span className='capitalize'>
                            {`${showMore ? 'Less' : 'More'}`}
                        </span>
                    </div>}
                <div
                    className={saved ?
                        'h-10 p-2 flex justify-center items-center gap-5 rounded-lg text-md text-gray-700 dark:text-gray-200 cursor-pointer border-1' :
                        'h-10 p-2 flex justify-center items-center gap-5 rounded-lg  text-white  text-md cursor-pointer'}
                    style={{ backgroundColor: saved ? '' : currentColor }}
                    onClick={saveChanges}
                >
                    <FaRegSave />
                    <span className='capitalize'>
                        {`Save`}
                    </span>
                </div>
            </div>
        </div>
    )
};

export default TestHeader;