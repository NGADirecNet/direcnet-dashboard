import { RiComputerLine } from 'react-icons/ri'
import { MdOutlineComputer } from 'react-icons/md'

const towerOneLogo = {
    Type: 'EMANE',
    Icon: <RiComputerLine />,
    IconColor: 'rgb(228, 106, 118)',
    IconBg: 'rgb(255, 244, 229)',
}

const towerTwoLogo = {
    Type: 'EMANE',
    Icon: <RiComputerLine />,
    IconColor: '#FEC90F',
    IconBg: '#FFFFE0',
}

const laptopOneLogo = {
    Type: 'EMANE',
    Icon: <MdOutlineComputer />,
    IconColor: 'rgb(228, 106, 118)',
    IconBg: 'rgb(255, 244, 229)',
}

const laptopTwoLogo = {
    Type: 'EMANE',
    Icon: <MdOutlineComputer />,
    IconColor: '#FEC90F',
    IconBg: '#FFFFE0',
}

export const customersData = [
    {
      Date: "6/6/2022",
      Machine: 'EMANE Laptop 1',
      Version: 'EMANE 1.3.1',
      ...laptopOneLogo,
      Name: '10 Node Test',
      Status: 'In Progress',
      StatusBg: '#FEC90F',
      // StatusBg: '#8BE78B',
      Duration: 'Overnight',
      Cycles: '10',
      Commit: 'c36fb4a',
    },
    {
      Date: "6/6/2022",
      Machine: 'EMANE Tower 2',
      Version: 'EMANE 1.3.1',
      ...towerTwoLogo,
      Name: '10 Node Test',
      Status: 'In Progress',
      StatusBg: '#FEC90F',
      Duration: 'Overnight',
      Cycles: '10',
      Commit: 'c36fb4a',
    },
    {
      Date: "6/6/2022",
      Machine: 'EMANE Laptop 2',
      Version: 'EMANE 1.3.1',
      ...laptopTwoLogo,
      Name: '10 Node Test',
      Status: 'Complete',
      StatusBg: '#8BE78B',
      Duration: 'Overnight',
      Cycles: '10',
      Commit: 'c36fb4a',
    },
    {
      Date: "6/6/2022",
      Machine: 'EMANE Tower 1',
      Version: 'EMANE 1.3.1',
      ...towerOneLogo,
      Name: '10 Node Test',
      Status: 'Complete',
      StatusBg: '#8BE78B',
      Duration: 'Overnight',
      Cycles: '10',
      Commit: 'c36fb4a',
    },
    {
      Date: "6/6/2022",
      Machine: 'EMANE Laptop 1',
      Version: 'EMANE 1.3.1',
      ...laptopOneLogo,
      Name: '10 Node Test',
      Status: 'Complete',
      StatusBg: '#8BE78B',
      Duration: 'Overnight',
      Cycles: '10',
      Commit: 'c36fb4a',
    },
    
];