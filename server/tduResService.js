const TDULiteRes = require('./models/tduResModel');
const ReadPreference = require('mongodb').ReadPreference;

// require('./mongo').connect();

function get(req, res) {
    const docquery = TDULiteRes.find({}).read(ReadPreference.NEAREST);
    docquery
        .exec()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function create(req, res) {
    const {
        id,
        name,
        a_results,
        b_results
    } = req.body;
    const result = new TDULiteRes({
        id,
        name,
        a_results,
        b_results
    });

    result
        .save()
        .then(() => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

// function update(req, res) {
//     const { id, name, saying } = req.body;

//     Test.findOne({ id })
//         .then(test => {
//             test.name = name;
//             test.saying = saying;
//             test.save().then(res.json(test));
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// }

// function destroy(req, res) {
//     const { id } = req.params;

//     Test.findOneAndRemove({ id })
//         .then(test => {
//             res.json(test);
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// }

module.exports = { get, create, /*update, destroy*/ };