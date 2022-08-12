import React from 'react';
import { Inject, CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, Gradient, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-circulargauge';
import { useWeatherContext } from '../../contexts/WeatherContextProvider';

const UVGauge = () => {
    const { current } = useWeatherContext();

    return (
        <CircularGaugeComponent id='uv' height='125px'>
            <Inject services={[Gradient]} />
            <AxesDirective>
                <AxisDirective radius='100%' startAngle={210} endAngle={150} minimum={0} maximum={12} majorTicks={{
                    width: 0, interval: 2
                }} lineStyle={{ width: 0, color: 'transparent' }} minorTicks={{
                    width: 0
                }} labelStyle={{
                    font: {
                        size: '10px',
                        fontFamily: 'Roboto',
                        fontWeight: 'Regular'
                    },
                    offset: 10
                }}>
                    <PointersDirective>
                        <PointerDirective value={current.uvi} radius='80%' color='gray' pointerWidth={10} cap={{
                            radius: 10, border: { color: 'black', width: 2.5 }, color: 'white'
                        }} needleTail={{ length: '0%' }} needleStartWidth={2} animation={{
                            enable: false
                        }}>
                        </PointerDirective>
                    </PointersDirective>
                    <RangesDirective>
                        <RangeDirective start={0} end={12} startWidth={10} endWidth={10} color={'#E63B86'} linearGradient={{
                            startValue: '0%',
                            endValue: '100%',
                            colorStop: [
                                { color: '#10FF00', offset: '0%', opacity: 0.9 },
                                { color: '#20FF00', offset: '3%', opacity: 0.9 },
                                { color: '#30FF00', offset: '6%', opacity: 0.9 },
                                { color: '#40FF00', offset: '9%', opacity: 0.9 },
                                { color: '#50FF00', offset: '12%', opacity: 0.9 },
                                { color: '#60FF00', offset: '15%', opacity: 0.9 },
                                { color: '#70FF00', offset: '18%', opacity: 0.9 },
                                { color: '#80FF00', offset: '21%', opacity: 0.9 },
                                { color: '#90FF00', offset: '24%', opacity: 0.9 },
                                { color: '#A0FF00', offset: '27%', opacity: 0.9 },
                                { color: '#B0FF00', offset: '30%', opacity: 0.9 },
                                { color: '#C0FF00', offset: '33%', opacity: 0.9 },
                                { color: '#D0FF00', offset: '36%', opacity: 0.9 },
                                { color: '#E0FF00', offset: '39%', opacity: 0.9 },
                                { color: '#F0FF00', offset: '42%', opacity: 0.9 },
                                { color: '#FFFF00', offset: '45%', opacity: 0.9 },
                                { color: '#FFF000', offset: '48%', opacity: 0.9 },
                                { color: '#FFE000', offset: '51%', opacity: 0.9 },
                                { color: '#FFD000', offset: '54%', opacity: 0.9 },
                                { color: '#FFC000', offset: '57%', opacity: 0.9 },
                                { color: '#FFB000', offset: '60%', opacity: 0.9 },
                                { color: '#FFA000', offset: '63%', opacity: 0.9 },
                                { color: '#FF9000', offset: '66%', opacity: 0.9 },
                                { color: '#FF8000', offset: '69%', opacity: 0.9 },
                                { color: '#FF7000', offset: '72%', opacity: 0.9 },
                                { color: '#FF6000', offset: '75%', opacity: 0.9 },
                                { color: '#FF5000', offset: '78%', opacity: 0.9 },
                                { color: '#FF4000', offset: '81%', opacity: 0.9 },
                                { color: '#FF3000', offset: '84%', opacity: 0.9 },
                                { color: '#FF2000', offset: '87%', opacity: 0.9 },
                                { color: '#FF1000', offset: '90%', opacity: 0.9 },
                                { color: 'red', offset: '100%', opacity: 0.9 },
                            ]
                        }} roundedCornerRadius={10} />
                    </RangesDirective>
                </AxisDirective>
            </AxesDirective>
        </CircularGaugeComponent>
    );
};

export default UVGauge;