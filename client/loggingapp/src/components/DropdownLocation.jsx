import React, { useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import dashApiService from '../api/dashApi';
import { useStateContext } from '../contexts/ContextProvider';
import EditableTextField from './EditableTextField';
import RemoveButton from './RemoveButton';


const DropdownLocation = ({ loc, idx }) => {
    const [hover, setHover] = useState(false);
    const [removeHover, setRemoveHover] = useState(false);
    const { dashInfo, setDashInfo } = useStateContext();

    const removeLocation = () => {
        const newDashInfo = { ...dashInfo, locations: [...dashInfo.locations.filter((loc, i) => i !== idx)] }
        setDashInfo(newDashInfo);
        dashApiService.update(newDashInfo);
    }

    const updateLocation = (e, field) => {
        let newLocations;
        if (!e.value) return;
        else if (field === 'lat' || field === 'long') {
            if (isNaN(e.value)) return;
            newLocations = [...dashInfo.locations.map((loc, i) => (i === idx ? { ...loc, [field]: parseFloat(e.value) } : loc))]
        }
        else {
            newLocations = [...dashInfo.locations.map((loc, i) => (i === idx ? { ...loc, [field]: e.value } : loc))]
        }
        const newDashInfo = { ...dashInfo, locations: newLocations };
        setDashInfo(newDashInfo);
        dashApiService.update(newDashInfo);
    }

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className='flex gap-1'>
                <EditableTextField
                    placeholder={loc.name}
                    className={`font-bold ${removeHover ? 'text-red-600': 'text-hii'}`}
                    onChange={(e) => updateLocation(e, 'name')}
                />
                <RemoveButton 
                    visible={hover}
                    onClick={removeLocation}
                    removeHover={removeHover}
                    setRemoveHover={setRemoveHover}
                />
            </div>
            <div className='flex gap-2'>
                <EditableTextField
                    placeholder={loc.lat}
                    className='font-semibold text-gray-400'
                    onChange={(e) => updateLocation(e, 'lat')}
                />
                <EditableTextField
                    placeholder={loc.long}
                    className='font-semibold text-gray-400'
                    onChange={(e) => updateLocation(e, 'long')}
                />
                {dashInfo.weatherDefault === idx && <button className='items-center text-hii font-semibold'><AiOutlineCheckCircle /></button>}
            </div>
        </div>
    );
}

export default DropdownLocation;