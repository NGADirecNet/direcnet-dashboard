import React, { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useStateContext } from '../contexts/ContextProvider';
import { Page } from '../components';
import calendarApiService from '../api/calendarApi';

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();
  const { cal } = useStateContext();

  useEffect(() => {
    if (scheduleObj && !cal.length) scheduleObj.showSpinner(true);
    else if (scheduleObj && cal.length) scheduleObj.showSpinner(false);
  }, [scheduleObj, cal])

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  const onActionComplete = (action) => {
    switch (action.requestType) {
      case "eventCreated":
        action.addedRecords.forEach((record) => {
          calendarApiService.create(record);
        })
        break;
      case "eventRemoved":
        action.deletedRecords.forEach((record) => {
          calendarApiService.destroy(record);
        })
        break;
      case "eventChanged":
        action.changedRecords.forEach((record) => {
          calendarApiService.update(record);
        })
        break;
      default:
        break;
    }
  }

  return (
    <Page headerCat="App" headerTitle="Calendar">
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        // selectedDate={new Date(2021, 0, 10)}
        eventSettings={{ dataSource: cal }}
        dragStart={onDragStart}
        actionComplete={onActionComplete}
      >
        <ViewsDirective>
          {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  // value={new Date(2021, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </Page>
  );
};

export default Scheduler;