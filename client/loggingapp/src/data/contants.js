// Store for all constant strings, magic numbers, etc.

export const newEvent = {
    time: "00:00 AM",
    description: "New Timeline Event"
};

export const newNode = {
    name: "New Node",
    description: "New Node Setup Instructions"
};

export const newPane = {
    header: "New Scenario Header",
    subheader: "New Scenario Subheader",
    setup: [newNode],
    events: [newEvent],
    attachments: []
};

export const newNote = "New Note...";

export const newTime = {
    name: "New Time...",
    time: "00:00AM"
};

export const newTestSuite = {
    commit: "",
    date: new Date(),
    location: "",
    notes: [],
    scenario: "New Test Suite",
    status: "in progress",
    time: [],
    timeline: [newPane],
    type: "new"
};

export const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

export const newMapsPane = {
    header: "New Action Header",
    subheader: "New Action Subheader",
    mapCenter: {
        latitude: 0,
        longitude: 0
    },
    zoomFactor: 1,
    markers: [],
    lines: []
};

export const newMarker = {
    visible: true,
    dataSource: [
        {
            latitude: 0,
            longitude: 0,
            nodeInfo: {
                name: 'New Marker'
            }
        }
    ],
    tooltipSettings: {
        visible: true,
        valuePath: 'nodeInfo.name'
    },
    width: '25',
    height: '25',
    shape: 'Diamond',
    fill: 'white',
    border: {
        width: 2,
        color: '#333'
    }
}

export const newLine = {
    name: 'New Line',
    visible: true,
    width: 100000,
    color: 'green',
    dashArray: 3,
    from: [0, 0],
    to: [0, 0]
}