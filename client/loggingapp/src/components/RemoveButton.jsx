import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { IoMdRemoveCircle } from 'react-icons/io';

export default function RemoveButton({ onClick, removeHover, setRemoveHover }) {
    const { currentColor } = useStateContext();

    return (
        <button
            type="button"
            style={{ color: removeHover ? "rgb(220, 38, 38)" : currentColor }}
            className="text-lg hover:drop-shadow-xl text-white rounded-full p-3"
            onClick={onClick}
            onMouseEnter={() => setRemoveHover(true)}
            onMouseLeave={() => setRemoveHover(false)}
        >
            <IoMdRemoveCircle />
        </button>
    )
}