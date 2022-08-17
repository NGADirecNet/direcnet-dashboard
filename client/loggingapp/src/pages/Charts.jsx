import React, { useState, useEffect } from 'react';
import { LineChart, Page } from '../components';
// import { tduDataLines, xAxis, yAxis } from '../data/tdudatadummy';
import Area from './Charts/Area';
import Bar from './Charts/Bar';
import Dropdown from '../components/Dropdown';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

const tduDataLines = (x, y) => {
  return null
}

const Charts = () => {
  const [dropdownValue, getDropdownValue] = useState(1)
  const [y1DropdownLine, setY1DropdownLine] = useState(1)
  const [y2DropdownLine, setY2DropdownLine] = useState(1)
  const [tduLines, setTduLines] = useState(tduDataLines(dropdownValue, parseInt(y1DropdownLine), parseInt(y2DropdownLine)))
  // fixme adjusting min in graphs seems to crash - scratch for now
  // const [minY, setMinY] = useState(0)
  // const [minY2, setMinY2] = useState(0)
  const [maxY, setMaxY] = useState(null)
  const [maxY2, setMaxY2] = useState(null)


  useEffect(() => {
    setTduLines(tduDataLines(dropdownValue, parseInt(y1DropdownLine), parseInt(y2DropdownLine)))
  }, [dropdownValue, y1DropdownLine, y2DropdownLine])

  return (
    <Page headerCat="App" headerTitle="Visualizing Test Results">
      {/* <Area /> */}
      {/* <Bar /> */}
      <div className="flex justify-between items-center gap-2">
        <div className='px-2'>
          <div className='flex justify-end items-center gap-12 py-2'>
            <div className='flex justify-center'>
              Line
            </div>
            <div className='w-20 mx-4 flex justify-center items-center'>
              Interval
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 py-2">
            <div>
              {'Y Axis 1'}
            </div>
            <Dropdown
              currentMode={'white'}
              width='250px'
              fields={{ text: 'type', value: 'id' }}
              data={[
                {
                  id: '1',
                  type: 'A Packets Received',
                },
                {
                  id: '2',
                  type: 'B Packets Sent',
                }, {
                  id: '3',
                  type: 'A-B Packet Difference',
                },
                {
                  id: '4',
                  type: 'A-B Byte Difference',
                },
                {
                  id: '5',
                  type: 'A-B Kilobit Difference',
                },
                {
                  id: '6',
                  type: 'A Externally Lost (FW/HW/OTA)',
                },
                {
                  id: '7',
                  type: 'B Externally Lost (FW/HW/OTA)',
                },
              ]}
              defaultValue={y1DropdownLine}
              onChange={setY1DropdownLine}
            />
            {/* <TextBoxComponent 
              placeholder='min' 
              floatLabelType='Auto' 
              value={minY} 
              change={(input) => setMinY(input.value)}
            /> */}
            <TextBoxComponent 
              placeholder='max' 
              floatLabelType='Auto'
              value={maxY}
              change={(input) => setMaxY(isNaN(input.value) ? null : input.value)}
              width="100px"
            />
          </div>
          <div className="flex justify-between items-center gap-2 py-2">
            <div>
              {'Y Axis 2'}
            </div>
            <Dropdown
              currentMode={'white'}
              width='250px'
              fields={{ text: 'type', value: 'id' }}
              data={[
                {
                  id: '1',
                  type: 'A Packets Received',
                },
                {
                  id: '2',
                  type: 'B Packets Sent',
                }, {
                  id: '3',
                  type: 'A-B Packet Difference',
                },
                {
                  id: '4',
                  type: 'A-B Byte Difference',
                },
                {
                  id: '5',
                  type: 'A-B Kilobit Difference',
                },
                {
                  id: '6',
                  type: 'A Externally Lost (FW/HW/OTA)',
                },
                {
                  id: '7',
                  type: 'B Externally Lost (FW/HW/OTA)',
                },
              ]}
              defaultValue={y2DropdownLine}
              onChange={setY2DropdownLine}
            />
            <TextBoxComponent 
              placeholder='max' 
              floatLabelType='Auto'
              value={maxY2}
              change={(input) => setMaxY2(isNaN(input.value) ? null : input.value)}
              width="100px"
            />
          </div>
          <div className="flex justify-start items-center gap-10 py-2">
            <div>
              {`Outdoor Test #:`}
            </div>
            <Dropdown
              currentMode={'white'}
              width='200px'
              fields={{ text: 'test', value: 'id' }}
              data={[
                {
                  id: '1',
                  test: 'outdoor_1',
                },
                {
                  id: '2',
                  test: 'outdoor_2',
                }, {
                  id: '4',
                  test: 'outdoor_4_old_setup',
                },
              ]}
              defaultValue={dropdownValue}
              onChange={getDropdownValue}
            />
          </div>
        </div>
        <div className='w-2/3'>
          {/* <LineChart
            series={tduLines}
            xAxis={xAxis}
            yAxis={yAxis(maxY)}
            y2Data={{
              type: null,
              // minimum: minY2,
              maximum: maxY2
            }}
          /> */}
        </div>
      </div>
    </Page>
  )
};
export default Charts;