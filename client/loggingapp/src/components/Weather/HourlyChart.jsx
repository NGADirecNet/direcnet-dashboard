import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { useWeatherContext } from '../../contexts/WeatherContextProvider';
import { useStateContext } from '../../contexts/ContextProvider';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';

const HourlyChart = () => {
    const { hourly } = useWeatherContext();
    const { currentColor } = useStateContext();
    console.log("hourly", hourly)

    // hourly with unix to utc tim and pop to percentage
    const [chartHourly, setChartHourly] = useState([]);

    // switch between hourly temp select and hourly pop select
    const [temp, setTemp] = useState(false);

    useEffect(() => {
        if (hourly.length) {
            setChartHourly(hourly.map(h => { return { ...h, dt: h.dt * 1000, pop: h.pop * 100 } }))
        }
    }, [hourly])

    const yAxis = temp ? {
        labelFormat: '{value}°',
        rangePadding: 'None',
        // minimum: -10,
        // maximum: 100,
        // interval: 20,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    } : {
        labelFormat: '{value}%',
        rangePadding: 'None',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    }


    return (
        <div>
            <p className='text-center font-semibold text-hii'>{'Hourly ' + (temp ? 'Temp.' : 'Precip. Chance')}</p>
            <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
                valueType: 'DateTime',
                labelFormat: 'MM/dd h:mm',
                intervalType: 'Hours',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 0 }
            }}
                primaryYAxis={yAxis}
                palettes={[currentColor]}
                chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} height='200px'>
                <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
                <SeriesCollectionDirective>
                    <SeriesDirective dataSource={chartHourly} xName='dt' yName={temp ? 'temp' : 'pop'} width={2} marker={{ visible: true, width: 2, height: 2 }} type='Line'>
                    </SeriesDirective>
                </SeriesCollectionDirective>
            </ChartComponent>
            <div className='text-center'>
                <button
                    type='button'
                    className='p-2 text-hii justify-center border-1 rounded-lg border-white hover:border-gray-200'
                    onClick={() => setTemp(prev => !prev)}
                >
                    <HiOutlineSwitchHorizontal />
                </button>
            </div>
        </div>
    );
};

export default HourlyChart;