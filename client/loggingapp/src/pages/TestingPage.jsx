import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom'
import { Page as PageWrap } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '../components';
import { gridTestIcon, gridTestStatus, gridTypeText } from '../data/dashLogos';


const testsGrid = [
  {
    headerText: 'Test',
    template: gridTestIcon,
    textAlign: 'Center',
    width: '120',
  },
  {
    // field: 'type',
    template: gridTypeText,
    headerText: 'Type',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  {
    field: 'location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'scenario',
    headerText: 'Scenario',
    format: 'C2',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150',
  },
  {
    headerText: 'Status',
    template: gridTestStatus,
    field: 'status',
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'commit',
    headerText: 'Commit',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'date',
    template: (props) => new Date(props.date).toLocaleString('en-US'),
    sortComparer: (r, c) => new Date(r) < new Date(c),
    headerText: 'Date',
    width: '200',
    textAlign: 'Center',
  },
];

const TestingPage = () => {
  const navigate = useNavigate();
  const { tests, currentColor } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true };
  let grid;

  const rowSel = () => {
    if (grid) {
      const data = grid.getSelectedRecords()
      navigate('/tests/' + data[0]._id)
    }
  }

  const newRow = () => {
    navigate('/tests/new')
  }

  const contextMenuItems = [
    'AutoFit',
    'AutoFitAll',
    'SortAscending',
    'SortDescending',
    'Copy',
    'Edit',
    'Delete',
    'Save',
    'Cancel',
    'PdfExport',
    'ExcelExport',
    'CsvExport',
    'FirstPage',
    'PrevPage',
    'LastPage',
    'NextPage',
  ];

  return (
    <PageWrap>
      <div className="m-3">
        <Button
          color="white"
          text="Add"
          bgColor={currentColor}
          borderRadius="10px"
          onClick={newRow}
        />
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={tests}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        rowSelected={rowSel}
        ref={g => grid = g}
        sortSettings={{
          columns: [{
            field: 'date',
            direction: 'Ascending'
          }]
        }}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {testsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </PageWrap>
  );
};
export default TestingPage;