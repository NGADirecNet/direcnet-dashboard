import React from 'react';
import { Inject, ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, ProgressAnnotation } from '@syncfusion/ej2-react-progressbar';
import { useWeatherContext } from '../../contexts/WeatherContextProvider';
import { useStateContext } from '../../contexts/ContextProvider';

const PrecipitaionBar = ({ series, xAxis, yAxis, y2Data }) => {
    const { daily } = useWeatherContext();
    const { currentColor } = useStateContext();

    const content1 = '<div id="point1" style="font-size:20px;font-weight:bold;color:black;fill:black"><span>60%</span></div>';

    return (
        <ProgressBarComponent 
            id="full-background" 
            type='Circular' 
            width='125px' 
            height='125px' 
            cornerRadius='Round' 
            enableRtl={false} 
            radius='100%' 
            innerRadius='100%' 
            progressThickness={10} 
            trackThickness={10} 
            value={daily[0].pop} 
            animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} 
            progressColor={currentColor}
        > 
            <Inject services={[ProgressAnnotation]} />
            <ProgressBarAnnotationsDirective>
                <ProgressBarAnnotationDirective content={content1}>
                </ProgressBarAnnotationDirective>
            </ProgressBarAnnotationsDirective>
        </ProgressBarComponent>
    );
};

export default PrecipitaionBar;