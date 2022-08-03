const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const calendarSchema = new Schema(
    {
        Id: {
            type: Number,
            required: true,
            unique: true
        },
        Subject: String,
        Location: String,
        StartTime: Date,
        StartTimezone: String,
        EndTime: Date,
        EndTimezone: String,
        CategoryColor: String,
        Description: String,
        IsAllDay: Boolean,
        RecurrenceRule: String,
    }
);

const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;