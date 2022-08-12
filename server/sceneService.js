const Scene = require('./models/sceneModel')
const ReadPreference = require('mongodb').ReadPreference;

function get(req, res) {
    const docquery = Scene.find({}).read(ReadPreference.NEAREST);
    docquery
        .exec()
        .then(scenes => {
            res.json(scenes);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function create(req, res) {
    const {
        name,
        actions
    } = req.body;
    const scene = new Scene({
        name,
        actions
    });

    scene
        .save()
        .then(() => {
            res.json(scene);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function update(req, res) {
    const {
        _id,
        name,
        actions
    } = req.body;

    Scene.findOne({ _id })
        .then(scene => {
            scene.name = name;
            scene.actions = actions;
            scene.save().then(res.json(scene));
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function destroy(req, res) {
    const { _id } = req.params;

    Scene.findOneAndRemove({ _id })
        .then(scene => {
            res.json(scene);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

module.exports = { get, create, update, destroy };