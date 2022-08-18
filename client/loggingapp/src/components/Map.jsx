import React, { useState, useEffect } from 'react'
import { MapsComponent, LayersDirective, LayerDirective, MarkersDirective, MarkerDirective, Inject, Marker, MapsTooltip, NavigationLine, NavigationLineDirective, NavigationLinesDirective } from '@syncfusion/ej2-react-maps'
import { useStateContext } from '../contexts/ContextProvider';

const Map = (props) => {
    const { activeMenu } = useStateContext();
    const [scene, setScene] = useState(null);
    const [map, setMap] = useState();
    const [resizing, setResizing] = useState(true);

    useEffect(() => {
        setResizing(false)
    }, [map])

    useEffect(() => {
        if (props.scene)
            setScene(props.scene);
        setResizing(false)
    }, [props.scene])

    useEffect(() => {
        setResizing(true);
    }, [scene])

    useEffect(() => {
        setResizing(true)
        setMap(null)
    }, [props.onResize, activeMenu])
    
    useEffect(() => {
        setResizing(false);
    }, [])


    const getMarkers = () => {
        // need at least 1 marker directive in there to make it not crash
        return (
            <MarkersDirective>
                <MarkerDirective />
                {(props.scene.markers && props.scene.markers.length) && props.scene.markers.map((node, idx) =>
                    <MarkerDirective
                        key={idx}
                        {...node}
                        animationDuration={0}
                    />
                )}
            </MarkersDirective>
        )
    }

    const getLines = () => {
        // need at least 1 line directive in there to make it not crash
        return (
            <NavigationLinesDirective>
                {/* <NavigationLineDirective /> */}
                {(props.scene.lines && props.scene.lines.length) && props.scene.lines.map(line =>
                    <NavigationLineDirective
                        {...line}
                        latitude={[line.from[0], line.to[0]]}
                        longitude={[line.from[1], line.to[1]]}
                    />
                )}
            </NavigationLinesDirective>
        )
    }

    return (!resizing ?
        <MapsComponent
            // id="maps"
            height={props.height}
            zoomSettings={{ zoomFactor: parseFloat(props.scene.zoomFactor) }}
            centerPosition={props.scene.mapCenter}
            ref={map => setMap(map)}
            resize={() => setResizing(true)}
        >
            <Inject services={[Marker, MapsTooltip, NavigationLine]} />
            <LayersDirective>
                <LayerDirective layerType='OSM'>
                    {getMarkers()}
                    {getLines()}
                </LayerDirective>
            </LayersDirective>
        </MapsComponent> : <></>
    );
}

export default Map;