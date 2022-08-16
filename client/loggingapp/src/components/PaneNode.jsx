import React, { useState, useEffect } from 'react'
import EditableTextField from './EditableTextField';
import RemoveButton from './RemoveButton';

// holds state for node hovering, renders node object from timeline to the DOM
export default function PaneNode({ node, onChange, showDesc = false, descOnChange, removeNode }) {
    const [hover, setHover] = useState(false);
    const [removeHover, setRemoveHover] = useState(false);

    return (
        <div
            className={`w-1/3 border-1 rounded-lg ${removeHover ? 'border-red-600' : hover ? 'border-gray-100' : 'border-white'}`}
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
                    <RemoveButton
                        visible={hover} 
                        onClick={removeNode} 
                        removeHover={removeHover}
                        setRemoveHover={setRemoveHover}
                    />
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