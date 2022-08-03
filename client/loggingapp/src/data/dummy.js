import React from 'react';
import { BsPersonFill, BsFillTreeFill } from 'react-icons/bs';
import { BiBuildingHouse } from 'react-icons/bi';
import { RiComputerLine } from 'react-icons/ri';

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

const customerGridImage = (props) => (
  <div className="image flex gap-4">
    <button
      type="button"
      style={{
        color: props.IconColor,
        backgroundColor: props.IconBg,
      }}
      className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
    >
      {props.Icon}
    </button>
    <div>
      <p>{props.Machine}</p>
      <p>{props.Version}</p>
    </div>
  </div>
);

const customerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
    <p>{props.Status}</p>
  </div>
);
export const areaPrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  majorGridLines: { width: 0 },
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  labelStyle: { color: 'gray' },
};

export const areaPrimaryYAxis = {
  labelFormat: '{value}%',
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: 'gray' },

};
export const barPrimaryXAxis = {
  valueType: 'Category',
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: 'transparent' },
};
const areaChartData = [
  [
    { x: new Date(2002, 0, 1), y: 2.2 },
    { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 },
    { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 },
    { x: new Date(2011, 0, 1), y: 3.1 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 2 },
    { x: new Date(2003, 0, 1), y: 1.7 },
    { x: new Date(2004, 0, 1), y: 1.8 },
    { x: new Date(2005, 0, 1), y: 2.1 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 1.5 },
    { x: new Date(2009, 0, 1), y: 2.8 },
    { x: new Date(2010, 0, 1), y: 1.5 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 0.8 },
    { x: new Date(2003, 0, 1), y: 1.3 },
    { x: new Date(2004, 0, 1), y: 1.1 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 2.3 },
    { x: new Date(2009, 0, 1), y: 2.7 },
    { x: new Date(2010, 0, 1), y: 1.1 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
];

export const areaCustomSeries = [
  {
    dataSource: areaChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Outdoor',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',

  },
  {
    dataSource: areaChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'EMANE',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',
  },
  {
    dataSource: areaChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Indoor',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',
  },
];

export const barChartData = [
  [
    { x: 'USA', y: 46 },
    { x: 'GBR', y: 27 },
    { x: 'CHN', y: 26 },
  ],
  [
    { x: 'USA', y: 37 },
    { x: 'GBR', y: 23 },
    { x: 'CHN', y: 18 },
  ],
  [
    { x: 'USA', y: 38 },
    { x: 'GBR', y: 17 },
    { x: 'CHN', y: 26 },
  ],
];

export const barCustomSeries = [
  {
    dataSource: barChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Gold',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Silver',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Bronze',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
];

export const LinePrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  intervalType: 'Months',
  edgeLabelPlacement: 'Shift',
  majorGridLines: { width: 0 },
  background: 'white',
};

export const LinePrimaryYAxis = {
  labelFormat: '{value}',
  rangePadding: 'None',
  minimum: 0,
  maximum: 20,
  interval: 5,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const customersGrid = [
  { type: 'checkbox', width: '50' },
  {
    headerText: 'Name',
    width: '150',
    template: customerGridImage,
    textAlign: 'Center'
  },
  {
    field: 'Name',
    headerText: 'Name',
    width: '150',
    textAlign: 'Center'
  },
  {
    field: 'Status',
    headerText: 'Status',
    width: '130',
    format: 'yMd',
    textAlign: 'Center',
    template: customerGridStatus
  },
  {
    field: 'Duration',
    headerText: 'Duration',
    width: '100',
    format: 'C2',
    textAlign: 'Center'
  },
  {
    field: 'Cycles',
    headerText: 'Cycles',
    width: '100',
    format: 'yMd',
    textAlign: 'Center'
  },

  {
    field: 'Commit',
    headerText: 'Commit',
    width: '150',
    textAlign: 'Center'
  },
  {
    field: 'Date',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    isPrimaryKey: true,
  },

];

export const recentTransactions = [
  {
    icon: <RiComputerLine />,
    amount: '2d ago',
    title: 'EMANE',
    desc: '4 Node',

    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <BsFillTreeFill />,
    amount: '3d ago',
    title: 'Outdoor',
    desc: 'Rome, NY',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'green-600',
  },
  {
    icon: <BiBuildingHouse />,
    amount: '1w ago',
    percentage: '',
    title: 'Indoor',
    desc: '2 Node',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <BiBuildingHouse />,
    amount: '1w ago',
    percentage: '',
    title: 'Indoor',
    desc: '1 Node',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <BsFillTreeFill />,
    amount: '2w ago',
    title: 'Outdoor',
    desc: 'Rome, NY',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'green-600',
  },
];

export const weeklyStats = [
  // {
  //   icon: <FiShoppingCart />,
  //   amount: '-$560',
  //   title: 'Top Sales',
  //   desc: 'Johnathan Doe',
  //   iconBg: '#FB9678',
  //   pcColor: 'red-600',
  // },
  // {
  //   icon: <FiStar />,
  //   amount: '-$560',
  //   title: 'Best Seller',
  //   desc: 'MaterialPro Admin',
  //   iconBg: 'rgb(254, 201, 15)',
  //   pcColor: 'red-600',
  // },
  // {
  //   icon: <BsChatLeft />,
  //   amount: '+$560',
  //   title: 'Most Commented',
  //   desc: 'Ample Admin',
  //   iconBg: '#00C292',
  //   pcColor: 'green-600',
  // },
  {
    icon: <BsPersonFill />,
    amount: 'Complete',
    title: 'DNET-313',
    desc: 'Anthony',
    iconBg: '#0d3d4b',
    pcColor: 'green-600',
  },
  {
    icon: <BsPersonFill />,
    amount: 'In Progress',
    title: 'DNET-323',
    desc: 'Andrew',
    iconBg: '#0d3d4b',
    pcColor: 'green-600',
  },
  {
    icon: <BsPersonFill />,
    amount: 'Complete',
    title: 'DNET-296',
    desc: 'Joe',
    iconBg: '#0d3d4b',
    pcColor: 'green-600',
  },
  {
    icon: <BsPersonFill />,
    amount: 'In Progress',
    title: 'DNET-301',
    desc: 'Lucas',
    iconBg: '#0d3d4b',
    pcColor: 'green-600',
  },
  {
    icon: <BsPersonFill />,
    amount: 'Ready for Testing',
    title: 'DNET-319',
    desc: 'Corey',
    iconBg: '#0d3d4b',
    pcColor: 'green-600',
  },
];

export const lineChartData = [
  [
    { x: new Date(2022, 4, 28), y: 1 },
    { x: new Date(2022, 5, 2), y: 2 },
    { x: new Date(2022, 5, 12), y: 2 },
    { x: new Date(2022, 5, 13), y: 3 },
    { x: new Date(2022, 5, 16), y: 3 },
    { x: new Date(2022, 5, 22), y: 3 },
    { x: new Date(2022, 6, 1), y: 2 },
  ],
  [
    { x: new Date(2022, 4, 29), y: 2 },
    { x: new Date(2022, 5, 2), y: 4 },
    { x: new Date(2022, 5, 12), y: 4 },
    { x: new Date(2022, 5, 13), y: 8 },
    { x: new Date(2022, 5, 16), y: 4 },
    { x: new Date(2022, 5, 22), y: 10 },
    { x: new Date(2022, 6, 1), y: 14 },
  ],

  [
    { x: new Date(2022, 4, 30), y: 1 },
    { x: new Date(2022, 5, 2), y: 2 },
    { x: new Date(2022, 5, 12), y: 3 },
    { x: new Date(2022, 5, 13), y: 3 },
    { x: new Date(2022, 5, 16), y: 2 },
    { x: new Date(2022, 5, 22), y: 3 },
    { x: new Date(2022, 6, 1), y: 2 },
  ],
];
export const dropdownData = [
  {
    Id: '1',
    Time: 'Last Week',
  },
  {
    Id: '2',
    Time: 'Last Month',
  }, {
    Id: '3',
    Time: 'All Time',
  },
];
export const SparklineAreaData = [
  { x: 1, yval: 2 },
  { x: 2, yval: 6 },
  { x: 3, yval: 8 },
  { x: 4, yval: 5 },
  { x: 5, yval: 10 },

];

export const lineCustomSeries = [
  {
    dataSource: lineChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Outdoor',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line'
  },

  {
    dataSource: lineChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'EMANE',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line'
  },

  {
    dataSource: lineChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Indoor',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line'
  },

];
