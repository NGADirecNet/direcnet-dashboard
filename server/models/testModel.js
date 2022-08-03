const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        demo: Boolean,
        commit: String,
        location: String,
        scenario: String,
        date: String,
        status: String, // completed, in prog, 
        type: String, // indoor, outdoor, emane
        timeline: [{
            header: String,
            subheader: String,
            setup: [{
                name: String,
                description: String
            }],
            events: [{
                time: String,
                description: String
            }],
            attachments: [],
        }],
        notes: [],
        time: [{
            name: String,
            time: String
        }],
        weather: {
            type: String,
            temperature: String
        },
        logoClick: String
    },
    { autoIndex: true }
);

const Test = mongoose.model('Test', testSchema);

module.exports = Test;