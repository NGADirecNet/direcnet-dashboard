const Calendar = require('./models/calendarModel');
const ReadPreference = require('mongodb').ReadPreference;

// require('./mongo').connect();

function get(req, res) {
    const docquery = Calendar.find({}).read(ReadPreference.NEAREST);
    docquery
        .exec()
        .then(cal => {
            res.json(cal);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function create(req, res) {
    const {
        Id,
        Subject,
        Location,
        StartTime,
        StartTimezone,
        EndTime,
        EndTimezone,
        CategoryColor,
        Description,
        IsAllDay,
        RecurrenceRule
    } = req.body;

    const cal = new Calendar({
        Id,
        Subject,
        Location,
        StartTime,
        StartTimezone,
        EndTime,
        EndTimezone,
        CategoryColor,
        Description,
        IsAllDay,
        RecurrenceRule
    });

    cal
        .save()
        .then(() => {
            res.json(cal);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function update(req, res) {
    const {
        Id,
        Subject,
        Location,
        StartTime,
        StartTimezone,
        EndTime,
        EndTimezone,
        CategoryColor,
        Description,
        IsAllDay,
        RecurrenceRule
    } = req.body;

    Calendar.findOne({ Id })
        .then(cal => {
            cal.Subject = Subject;
            cal.Location = Location;
            cal.StartTime = StartTime;
            cal.StartTimezone = StartTimezone;
            cal.EndTime = EndTime;
            cal.EndTimezone = EndTimezone;
            cal.CategoryColor = CategoryColor;
            cal.Description = Description;
            cal.IsAllDay = IsAllDay;
            cal.RecurrenceRule = RecurrenceRule;
            cal.save()
                .then(res.json(cal));
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function destroy(req, res) {
    const { Id } = req.params;

    Calendar.findOneAndRemove({ Id })
        .then( cal => {
            res.json(cal);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

module.exports = { get, create, update, destroy };