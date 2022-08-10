import React, { useState, useEffect } from 'react'
import { MapsComponent, LayersDirective, LayerDirective, MarkersDirective, MarkerDirective, Inject, Marker, MapsTooltip, NavigationLine, NavigationLineDirective, NavigationLinesDirective } from '@syncfusion/ej2-react-maps'

const Map = (props) => {
    const [map, setMap] = useState();
    const [resizeOccur, setResizeOccur] = useState(null);
    const [sceneChangeOccur, setSceneChangeOccur] = useState(null);
    const [resizing, setResizing] = useState(true);
    console.log("props", props)
    useEffect(() => {
        setResizing(false)
    }, [map])

    useEffect(() => {
        // ex. we showed more/less of details pane
        if (props.onResize !== resizeOccur) {
            console.log("setting true")
            setResizing(true);
            setResizeOccur(props.onResize);
        }
        // api call for scene has not finished yet
        else if (props.scene === undefined || !props.scene.markers || !props.scene.lines) {
            setResizing(true);
            console.log("scene not ready yet")
        }
        // we changed the scene, need to re render Map
        // else if (props.sceneChange !== sceneChangeOccur) {
        //     setResizing(true);
        //     // setSceneChangeOccur(props.sceneChange);
        //     console.log("scene was updated");
        // }
        // all good, proceed with rendering map
        else {
            console.log("scene ready");
            setSceneChangeOccur(props.scene)
            setResizing(false);
        } 
    }, [props, resizeOccur, sceneChangeOccur])

    // useEffect(() )

    return (!resizing ?
        <MapsComponent
            id="maps"
            height={props.height}
            zoomSettings={{ zoomFactor: props.scene.zoomFactor }}
            centerPosition={props.scene.mapCenter}
            ref={map => setMap(map)}
            resize={() => setResizing(true)}
        >
            <Inject services={[Marker, MapsTooltip, NavigationLine]} />
            <LayersDirective>
                <LayerDirective layerType='OSM'>
                    {props.scene.markers.length && <MarkersDirective>
                        {props.scene.markers.map((node, idx) => <MarkerDirective key={idx} {...node} />)}
                        {/* {!move ? <MarkerDirective {...mobileNode} /> : <></>} */}
                    </MarkersDirective>}
                    {props.scene.lines.length && <NavigationLinesDirective>
                        {props.scene.lines.map(line => <NavigationLineDirective {...line} latitude={[line.from[0], line.to[0]]} longitude={[line.from[1], line.to[1]]} />)}
                    </NavigationLinesDirective>}
                </LayerDirective>
            </LayersDirective>
        </MapsComponent> : <></>
    );
}

export default Map;