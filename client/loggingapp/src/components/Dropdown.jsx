import React, { useState, useEffect } from 'react'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const defaultDropdownData = [
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

const Dropdown = ({ currentMode, fields = null, data = null, width = null, defaultValue = null, onChange = null }) => {
  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    onChange && onChange(value)
  }, [value])

  return (
    <div className={`w-${width}px border-1 border-color px-2 py-1 rounded-md`}>
      <DropDownListComponent
        id="time"
        fields={fields ? fields : { text: 'Time', value: 'Id' }}
        style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }}
        value={value}
        change={(input) => setValue(input.value)}
        dataSource={data ? data : defaultDropdownData}
        popupHeight="220px"
        popupWidth={width ? width : "120px"}
      />
    </div>
  )
};

export default Dropdown