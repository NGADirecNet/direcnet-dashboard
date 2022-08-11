import React, { useEffect } from 'react'
import { Page } from '../components'
import { BsSun } from 'react-icons/bs'
import { days } from '../data/contants'
import { apiIcon } from '../data/weatherUtil'
import { useWeatherContext } from '../contexts/WeatherContextProvider'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, ProgressAnnotation } from '@syncfusion/ej2-react-progressbar';
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, Gradient, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-circulargauge';

export let data1 = [
    { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 }
];
export let data2 = [
    { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
];

const Weather = () => {
    const { weatherData, current, hourly, daily } = useWeatherContext();

    // https://openweathermap.org/api/one-call-3

    // https://openweathermap.org/weather-conditions#How-to-get-icon-URL

    const getWeatherIcon = (iconId) => {
        return apiIcon.find(i => i.name === iconId.slice(0, 2)).icon
    }

    // convert weather api unix utc time to Date object
    const unixToDate = (dt) => {
        // time zone offset is -14400
        // 1000 converts to milliseconds input
        return new Date((dt) * 1000)
    }

    return (
        <Page headerCat="App" headerTitle="Weather">
            <div className='flex gap-2'>
                {(weatherData && current && hourly && daily) &&
                    <>
                        <div className='flex w-full gap-2'>
                            <div className='w-2/3'>
                                <div className='flex p-4 border-1 rounded-lg h-72 shadow-md'>
                                    <div className='w-1/2'>
                                        temp
                                    </div>
                                    <div className='w-1/2 h-72'>
                                        <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
                                            valueType: 'DateTime',
                                            labelFormat: 'y',
                                            intervalType: 'Years',
                                            edgeLabelPlacement: 'Shift',
                                            majorGridLines: { width: 0 }
                                        }} primaryYAxis={{
                                            labelFormat: '{value}%',
                                            rangePadding: 'None',
                                            minimum: 0,
                                            maximum: 100,
                                            interval: 20,
                                            lineStyle: { width: 0 },
                                            majorTickLines: { width: 0 },
                                            minorTickLines: { width: 0 }
                                        }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} title='Inflation - Consumer Price' height='250px'>
                                            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
                                            <SeriesCollectionDirective>
                                                <SeriesDirective dataSource={data1} xName='x' yName='y' name='Germany' width={2} marker={{ visible: true, width: 10, height: 10 }} type='Line'>
                                                </SeriesDirective>
                                                <SeriesDirective dataSource={data2} xName='x' yName='y' name='England' width={2} marker={{ visible: true, width: 10, height: 10 }} type='Line'>
                                                </SeriesDirective>
                                            </SeriesCollectionDirective>
                                        </ChartComponent>
                                    </div>
                                </div>
                                <div className='mt-2 grid grid-rows-2 grid-flow-col gap-2'>
                                    <div className='flex p-2 border-1 rounded-lg shadow-md'>
                                        <div className='w-1/2'>
                                            <p>Precipitaion</p>
                                            <p>Chance of Rain</p>
                                            <p>24%</p>
                                        </div>
                                        <div className='w-1/2'>
                                            <ProgressBarComponent id="full-background" type='Circular' width='160px' height='160px' cornerRadius='Round' enableRtl={false} radius='100%' innerRadius='190%' progressThickness={10} trackThickness={80} value={60} animation={{
                                                enable: true,
                                                duration: 2000,
                                                delay: 0,
                                            }} >
                                                <Inject services={[ProgressAnnotation]} />
                                                <ProgressBarAnnotationsDirective>
                                                    <ProgressBarAnnotationDirective>
                                                    </ProgressBarAnnotationDirective>
                                                </ProgressBarAnnotationsDirective>

                                            </ProgressBarComponent>
                                        </div>
                                    </div>
                                    <div className='flex p-4 border-1 rounded-lg shadow-md'>
                                        <div className='w-1/2'>
                                            <p>Humidity</p>
                                            <p>High</p>
                                            <p>59%</p>
                                        </div>
                                        <div className='w-1/2'>
                                            <CircularGaugeComponent id='gauge'>
                                                <AxesDirective>
                                                    <AxisDirective radius='80%' startAngle={230} endAngle={130}
                                                        majorTicks={{ width: 0 }} lineStyle={{ width: 8 }}
                                                        minorTicks={{ width: 0 }} labelStyle={{
                                                            font: {
                                                                fontFamily: 'Roboto',
                                                                size: '12px',
                                                                fontWeight: 'Regular'
                                                            },
                                                            offset: -5
                                                        }}>
                                                        <PointersDirective>
                                                            <PointerDirective value={60} radius='60%' pointerWidth={7} cap={{
                                                                radius: 8,
                                                                border: { width: 0 }
                                                            }} needleTail={{
                                                                length: '25%'
                                                            }} />
                                                        </PointersDirective>
                                                    </AxisDirective>
                                                </AxesDirective>
                                            </CircularGaugeComponent>
                                        </div>
                                    </div>
                                    <div className='flex p-4 border-1 rounded-lg shadow-md'>
                                        <div className='w-1/2'>
                                            <p>Wind</p>
                                            <p>Wind Speed</p>
                                            <p>Wind Direction</p>
                                        </div>
                                        <div className='w-1/2'>
                                            <CircularGaugeComponent id='direction-gauge'>
                                                <AxesDirective>
                                                    <AxisDirective radius='70%' startAngle={0} endAngle={360} minimum={0} maximum={8} majorTicks={{
                                                        height: 15,
                                                        interval: 1
                                                    }} lineStyle={{ width: 10 }} minorTicks={{
                                                        height: 10,
                                                        interval: 0.5
                                                    }} labelStyle={{
                                                        font: {
                                                            size: '12px', fontFamily: 'Roboto'
                                                        },
                                                        autoAngle: true,
                                                        hiddenLabel: 'Last'
                                                    }}>
                                                        <PointersDirective>
                                                            <PointerDirective value={7} radius='50%' color='#f03e3e' pointerWidth={20} cap={{
                                                                radius: 0
                                                            }} animation={{
                                                                enable: false
                                                            }} />
                                                            <PointerDirective value={3} radius='50%' color='#9E9E9E' pointerWidth={20} cap={{
                                                                radius: 0
                                                            }} animation={{
                                                                enable: false
                                                            }} />
                                                        </PointersDirective>
                                                    </AxisDirective>
                                                </AxesDirective>
                                            </CircularGaugeComponent>
                                        </div>
                                    </div>
                                    <div className='flex p-4 border-1 rounded-lg shadow-md'>
                                        <div className='w-1/2'>
                                            <p>UV Index</p>
                                            <p>High</p>
                                            <p>7</p>
                                        </div>
                                        <div className='w-1/2'>
                                            <CircularGaugeComponent id='gauge' >
                                                <Inject services={[Gradient]} />
                                                <AxesDirective>
                                                    <AxisDirective radius='80%' startAngle={210} endAngle={150} minimum={0} maximum={100} majorTicks={{
                                                        width: 0, interval: 10
                                                    }} lineStyle={{ width: 0, color: 'transparent' }} minorTicks={{
                                                        width: 0
                                                    }} labelStyle={{
                                                        font: {
                                                            size: '12px',
                                                            fontFamily: 'Roboto',
                                                            fontWeight: 'Regular'
                                                        },
                                                        offset: 10
                                                    }}>
                                                        <PointersDirective>
                                                            <PointerDirective value={65} radius='85%' color='#E63B86' pointerWidth={12} cap={{
                                                                radius: 12, border: { color: '#E63B86', width: 2.5 }, color: 'white'
                                                            }} needleTail={{ length: '0%' }} needleStartWidth={2} animation={{
                                                                enable: false
                                                            }}>
                                                            </PointerDirective>
                                                        </PointersDirective>
                                                        <RangesDirective>
                                                            <RangeDirective start={0} end={120} startWidth={18} endWidth={18} color={'#E63B86'} linearGradient={{
                                                                startValue: '0%',
                                                                endValue: '100%',
                                                                colorStop: [
                                                                    { color: '#9E40DC', offset: '0%', opacity: 0.9 },
                                                                    { color: '#E63B86', offset: '70%', opacity: 0.9 },
                                                                ]
                                                            }} roundedCornerRadius={10} />
                                                        </RangesDirective>
                                                    </AxisDirective>
                                                </AxesDirective>
                                            </CircularGaugeComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/3 p-4 border-1 rounded-lg shadow-md'>
                                right side
                            </div>
                        </div>
                    </>}
            </div>
        </Page >
    )
}

export default Weather