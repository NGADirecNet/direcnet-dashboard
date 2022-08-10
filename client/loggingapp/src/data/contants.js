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