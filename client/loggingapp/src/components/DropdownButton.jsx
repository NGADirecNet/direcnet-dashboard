import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri';

export default function DropdownButton({ state, setState, alwaysHidden }) {
    const [hovering, setHovering] = useState(false);
    const className = alwaysHidden ?
        "text-xl font-semibold text-white rounded-lg cursor-default" :
        // hovering ?
            "text-xl font-semibold text-gray-300 rounded-lg" //:
            // "text-xl font-semibold text-white rounded-lg";

    return (
        <button
            type="button"
            className={className}
            onClick={() => setState(prev => !prev)}
            // onMouseEnter={() => setHovering(true)}
            // onMouseLeave={() => setHovering(false)}
        >
            {state ? <RiArrowDropDownLine /> : <RiArrowDropRightLine />}
        </button>
    )
};