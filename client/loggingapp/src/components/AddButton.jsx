import React from 'react'
import { IoMdAdd } from 'react-icons/io'

// encapsulates gray add button found in TestViews & TestPanes
export default function AddButton({ onClick }) {
    return (
        <div
            className='flex justify-center items-center p-3 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-1 hover:cursor-pointer'
            onClick={onClick}
        >
            <IoMdAdd />
        </div>
    )
}