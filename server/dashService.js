const Dash = require('./models/dashModel');
const ReadPreference = require('mongodb').ReadPreference;

// require('./mongo').connect();

function get(req, res) {
    const docquery = Dash.find({}).read(ReadPreference.NEAREST);
    docquery
        .exec()
        .then(d => {
            res.json(d);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function create(req, res) {
    const {
        latest, sync
    } = req.body;

    const d = new Dash({
        latest, sync
    });

    d
        .save()
        .then(() => {
            res.json(d);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function update(req, res) {
    const {
        _id, latest, sync
    } = req.body;

    Dash.findOne({ _id })
        .then(d => {
            d.latest = latest;
            d.sync = sync;
            d.save()
                .then(res.json(d));
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function destroy(req, res) {
    const { _id } = req.params;

    Dash.findOneAndRemove({ _id })
        .then( d => {
            res.json(d);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

module.exports = { get, create, update, destroy };