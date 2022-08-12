import React from 'react';
import { Inject, CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, Gradient, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-circulargauge';
import { useWeatherContext } from '../../contexts/WeatherContextProvider';

const Humidity = () => {
    const { current } = useWeatherContext();

    return (
        <CircularGaugeComponent id='humidity' height='125px'>
            <AxesDirective>
                <AxisDirective radius='100%' startAngle={230} endAngle={130}
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
                        <PointerDirective value={current.humidity} radius='80%' pointerWidth={7} cap={{
                            radius: 8,
                            border: { width: 0 }
                        }} needleTail={{
                            length: '25%'
                        }} />
                    </PointersDirective>
                </AxisDirective>
            </AxesDirective>
        </CircularGaugeComponent>
    );
};

export default Humidity;