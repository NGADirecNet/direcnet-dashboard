import React, { useState } from 'react'
import { IoMdRemoveCircle } from 'react-icons/io';
import { useStateContext } from '../contexts/ContextProvider';
import EditableTextField from './EditableTextField';

// holds state for node hovering, renders node object from timeline to the DOM
export default function PaneNode({ node, onChange, showDesc = false, descOnChange, removeNode }) {
    const { currentColor } = useStateContext();
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`w-1/3 ${hover && 'border-1 rounded-lg'}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={`flex ${hover ? 'justify-between' : 'justify-center'}`}>
                <EditableTextField
                    placeholder={node.name}
                    className='text-sm text-center font-semibold p-2'
                    onChange={onChange}
                />
                {hover &&
                    <button
                        type="button"
                        style={{ color: currentColor }}
                        className="text-lg hover:drop-shadow-xl text-white rounded-full p-2"
                        onClick={removeNode}
                    >
                        <IoMdRemoveCircle />
                    </button>
                }
            </div>
            {showDesc &&
                <div>
                    {node.description &&
                        <EditableTextField
                            placeholder={node.description}
                            className='m-1 text-xs'
                            onChange={descOnChange}
                        />}
                </div>
            }
        </div>
    )
}