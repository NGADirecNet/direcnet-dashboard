import { BsFillTreeFill } from 'react-icons/bs'
import { RiComputerLine } from 'react-icons/ri'
import { BiBuildingHouse } from 'react-icons/bi'
import { GoEye } from 'react-icons/go'
import { IoMdAdd } from 'react-icons/io'
import { getTestType } from './dataUtil'

export const outdoorLogo = {
    Type: 'Outdoor Test',
    Icon: <BsFillTreeFill />,
    IconColor: 'rgb(0, 194, 146)',
    IconBg: 'rgb(235, 250, 242)',
}

export const indoorLogo = {
    Type: 'Indoor Test',
    Icon: <BiBuildingHouse />,
    IconColor: '#03C9D7',
    IconBg: '#E5FAFB',
}

export const emaneLogo = {
    Type: 'EMANE',
    Icon: <RiComputerLine />,
    IconColor: 'rgb(228, 106, 118)',
    IconBg: 'rgb(255, 244, 229)',
}

export const demoLogo = {
    Type: 'DEMO',
    Icon: <GoEye />,
    IconColor: 'rgb(228, 106, 118)',
    IconBg: 'rgb(255, 244, 229)',
}

export const newLogo = {
    Type: 'New Test Type',
    Icon: <IoMdAdd />,
    IconColor: 'rgb(228, 106, 118)',
    IconBg: 'rgb(255, 244, 229)',
}

export const gridTestStatus = (props) => {
    var statusBg =
        props.status === 'completed' ? '#8BE78B'
            : props.status === 'in progress' ? '#FEC90F'
                : 'rgb(228, 106, 118)'

    return (
        <button
            type="button"
            style={{ background: statusBg }}
            className="text-white py-1 px-2 capitalize rounded-2xl text-md"
        >
            {props.status}
        </button>
    )
}

export const gridTestIcon = (props) => {
    var logo = getTestType(props.type);
    return (
        <button
            type="button"
            style={{
                color: logo.IconColor,
                backgroundColor: logo.IconBg,
            }}
            className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
        >
            {logo.Icon}
        </button>
    )
}

export const gridTypeText = (props) => {
    return props.type === 'outdoor' ? 'Outdoor Test'
        : props.type === 'indoor' ? 'Indoor Test'
            : props.type === 'demo' ? 'Demo'
                : 'EMANE'
}