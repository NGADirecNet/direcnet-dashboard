import React from 'react';
import { Inject, CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, Gradient, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-circulargauge';
import { useWeatherContext } from '../../contexts/WeatherContextProvider';

const Compass = () => {
    const { hourly } = useWeatherContext();

    const onLabelRender = (args) => {
        args.text = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''][args.value];
    }

    return (
        <CircularGaugeComponent id='direction-gauge' height='125px' axisLabelRender={onLabelRender}>
            <AxesDirective>
                <AxisDirective radius='100%' startAngle={0} endAngle={360} minimum={0} maximum={8} majorTicks={{
                    height: 6,
                    interval: 1
                }} lineStyle={{ width: 1 }} minorTicks={{
                    height: 4,
                    interval: 0.5
                }} labelStyle={{
                    font: {
                        size: '10px', fontFamily: 'Roboto'
                    },
                    autoAngle: true,
                    hiddenLabel: 'Last'
                }}>
                    <PointersDirective>
                        <PointerDirective value={7} radius='50%' color='#f03e3e' pointerWidth={3} cap={{
                            radius: 0
                        }} animation={{
                            enable: false
                        }} />
                        <PointerDirective value={3} radius='50%' color='#9E9E9E' pointerWidth={3} cap={{
                            radius: 0
                        }} animation={{
                            enable: false
                        }} />
                    </PointersDirective>
                </AxisDirective>
            </AxesDirective>
        </CircularGaugeComponent>
    );
};

export default Compass;