import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip, Zoom, Scrollbar, AxesDirective, AxisDirective } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = ({ series, xAxis, yAxis, y2Data, tooltip=null }) => {
  const { currentMode } = useStateContext();
  
  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={xAxis}
      primaryYAxis={yAxis}
      // primaryYAxis={{
      //   minimum: 0, maximum: 100, interval: 20,
      //   lineStyle: { width: 0 },
      //   labelFormat: '{value}°F'
      // }}
      chartArea={{ border: { width: 0 } }}
      tooltip={tooltip ? tooltip : {
        enable: true,
        format: 'Seq Num: ${point.x} : <b>${point.y}</b>' //${point.tooltip}'
      }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
      zoomSettings={{
        enableSelectionZooming: true,
        enableScrollbar: true,
        enablePan: true,
        toolbarItems: ["ZoomIn", "ZoomOut", "Reset"]
      }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip, Zoom]} />
      <AxesDirective>
        <AxisDirective 
          name='yAxis1' 
          labelFormat='{value}'
          majorGridLines={{ width: 0 }}  
          rowIndex={0} 
          opposedPosition={true} 
          lineStyle={{ width: 0 }} 
          minimum={0} 
          // maximum={36} 
          // interval={2} 
          majorTickLines={{ width: 0 }}
          {...y2Data} 
        >
        </AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {series.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;