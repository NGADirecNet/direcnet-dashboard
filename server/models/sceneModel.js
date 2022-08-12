const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const sceneSchema = new Schema(
    {
        name: String,
        actions: [{
            header: String,
            subheader: String,
            zoomFactor: Number,
            mapCenter: {
                latitude: Number,
                longitude: Number
            },
            markers: [{
                border: {
                    width: Number,
                    color: String
                },
                dataSource: [{
                    latitude: Number,
                    longitude: Number,
                    nodeInfo: {
                        name: String
                    }
                }],
                fill: String,
                height: String,
                shape: String,
                tooltipSettings: {
                    valuePath: String,
                    visible: Boolean
                },
                visible: Boolean,
                width: String
            }],
            lines: [{
                name: String,
                visible: Boolean,
                width: Number,
                color: String,
                dashArray: Number,
                from: [],
                to: [],
            }]
        }]
    }
);

const Scene = mongoose.model('Scene', sceneSchema);
module.exports = Scene;