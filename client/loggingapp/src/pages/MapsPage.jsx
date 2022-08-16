import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Page as PageWrap } from '../components'
import { useStateContext } from '../contexts/ContextProvider'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

const testsGrid = [
    {
      field: 'name',
      headerText: 'Name',
      width: '150',
      textAlign: 'Center',
    },
  ];

const MapsPage = () => {
    const { currentColor, sceneMaps } = useStateContext();
    const navigate = useNavigate();
    let grid;

    const rowSel = () => {
        if (grid) {
            const data = grid.getSelectedRecords()
            navigate('/maps/' + data[0]._id)
        }
    }

    return (
        <PageWrap headerCat="Page" headerTitle="Maps">
            <div className="m-3">
                <Button
                    color="white"
                    text="Add"
                    bgColor={currentColor}
                    borderRadius="10px"
                    onClick={() => navigate('/maps/new')}
                />
            </div>
            <GridComponent
                // id="gridcomp"
                dataSource={sceneMaps}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                // contextMenuItems={contextMenuItems}
                // editSettings={editing}
                rowSelected={rowSel}
                ref={g => grid = g}
                // sortSettings={{
                //     columns: [{
                //         field: 'date',
                //         direction: 'Ascending'
                //     }]
                // }}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {testsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </PageWrap>
    )
}

export default MapsPage;