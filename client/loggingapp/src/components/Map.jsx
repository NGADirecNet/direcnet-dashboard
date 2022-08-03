import React from 'react'
import { MapsComponent, LayersDirective, LayerDirective, MarkersDirective, MarkerDirective, Inject, Marker, MapsTooltip, NavigationLine, NavigationLineDirective, NavigationLinesDirective } from '@syncfusion/ej2-react-maps'

export default function Map(props) {

    // gives shape, fill, width
    const defaultMarkerProps = {
        shape: 'Diamond',
        fill: 'white',
        width: '25',
        height: '25',
        border: {
            width: 2,
            color: '#333'
        },
        tooltipSettings: {
            template: '<div id="markertooltiptemplate" style="width: 170px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">' +
                '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>' +
                '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
                '<div><span style="font-size:13px;color:#cccccc">Standalone : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Standalone}</span></div>' +
                '<div><span style="font-size:13px;color:#cccccc">GPS : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${GPS}</span></div>' +
                '<div><span style="font-size:13px;color:#cccccc">Webcam : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Webcam}</span></div></div>',
            visible: true,
            valuePath: 'nodeInfo'
        }
    }

    const markers = [
        {
            ...defaultMarkerProps,
            visible: true,
            animationDuration: 0,
            dataSource: [
                {
                    latitude: 43.213081,
                    longitude: -75.397337,
                    name: "Node B",
                    Standalone: "Yes",
                    GPS: "VectorNav",
                    Webcam: "Yes",
                    nodeInfo: {},
                }
            ],
        },
        {
            ...defaultMarkerProps,
            visible: true,
            animationDuration: 0,
            dataSource: [
                {
                    latitude: 43.213278,
                    longitude: -75.397059,
                    name: "Node A",
                    Standalone: "No",
                    GPS: "AdaFruit",
                    Webcam: "No",
                    nodeInfo: {},
                }
            ],
        },
        {
            ...defaultMarkerProps,
            visible: true,
            animationDuration: 0,
            dataSource: [
                {
                    latitude: 43.212559,
                    longitude: -75.396122,
                    name: "Node C",
                    Standalone: "No",
                    GPS: "AdaFruit",
                    Webcam: "No",
                    nodeInfo: {},
                }
            ],
        },

    ]

    return (
        <MapsComponent
            id="maps"
            height={props.height}
            zoomSettings={{
                zoomFactor: 17
                // zoomFactor: 10
            }}
            centerPosition={{
                latitude: 43.212400,
                longitude: -75.397000
            }}
        >
            <Inject services={[Marker, MapsTooltip, NavigationLine]} />
            <LayersDirective>
                <LayerDirective layerType='OSM'>
                    <MarkersDirective>
                        {markers.map((node, idx) => <MarkerDirective key={idx} {...node} />)}
                    </MarkersDirective>
                    <NavigationLinesDirective>
                        {/* TODO FIX */}
                        <NavigationLineDirective width={1}
                            visible={true}
                            angle={-0.05}
                            color='#00ace6'
                            latitude={[43.213278, 43.212559]}
                            longitude={[-75.397059, -75.396122]}>
                        </NavigationLineDirective>
                    </NavigationLinesDirective>
                </LayerDirective>
            </LayersDirective>
        </MapsComponent>
    )
}