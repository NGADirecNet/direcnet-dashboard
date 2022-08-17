import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Page as PageWrap } from '../components';
import { RiComputerLine } from 'react-icons/ri'
import { MdOutlineComputer } from 'react-icons/md'

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

const emaneGrid = [
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

const emaneData = [
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

const EmanePage = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <PageWrap headerCat="Page" headerTitle="EMANE Test Suite">
      <GridComponent
        dataSource={emaneData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {emaneGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </PageWrap>
  );
};

export default EmanePage;