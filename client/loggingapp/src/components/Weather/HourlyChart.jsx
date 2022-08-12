import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { useWeatherContext } from '../../contexts/WeatherContextProvider';
import { useStateContext } from '../../contexts/ContextProvider';

export let data1 = [
    { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 }
];

const HourlyChart = () => {
    const { hourly } = useWeatherContext();
    const { currentColor } = useStateContext();
    
    // hourly with unix to utc tim 
    const [chartHourly, setChartHourly] = useState([]);

    useEffect(() => {
        if (hourly.length) {
            setChartHourly(hourly.map(h => {return {...h, dt: h.dt * 1000} }))
        }
    }, [hourly])


    return (
        <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'DateTime',
            labelFormat: 'MM/dd h:mm',
            intervalType: 'Hours',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        }} 
        primaryYAxis={{
            labelFormat: '{value}°',
            rangePadding: 'None',
            minimum: -10,
            maximum: 100,
            interval: 20,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        }} 
        palettes={[currentColor]}
        chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} title='Hourly Temp.' height='250px'>
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={chartHourly} xName='dt' yName='temp' width={2} marker={{ visible: true, width: 2, height: 2 }} type='Line'>
                </SeriesDirective>
            </SeriesCollectionDirective>
        </ChartComponent>
    );
};

export default HourlyChart;