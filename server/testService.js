const Test = require('./models/testModel');
const ReadPreference = require('mongodb').ReadPreference;

// require('./mongo').connect();

function get(req, res) {
    const docquery = Test.find({}).read(ReadPreference.NEAREST);
    docquery
        .exec()
        .then(tests => {
            res.json(tests);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function create(req, res) {
    const {
        commit,
        location,
        scenario,
        date,
        status,
        type,
        timeline,
        notes,
        time
    } = req.body;
    const test = new Test({
        commit,
        location,
        scenario,
        date,
        status,
        type,
        timeline,
        notes,
        time
    });

    test
        .save()
        .then(() => {
            res.json(test);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function update(req, res) {
    const {
        _id,
        commit,
        location,
        scenario,
        date,
        status,
        type,
        timeline,
        notes,
        time
    } = req.body;

    Test.findOne({ _id })
        .then(test => {
            test.commit = commit;
            test.location = location;
            test.scenario = scenario;
            test.date = date;
            test.status = status;
            test.type = type;
            test.timeline = timeline;
            test.notes = notes;
            test.time = time;
            test.save().then(res.json(test));
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function destroy(req, res) {
    const { _id } = req.params;

    Test.findOneAndRemove({ _id })
        .then(test => {
            res.json(test);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

module.exports = { get, create, update, destroy };