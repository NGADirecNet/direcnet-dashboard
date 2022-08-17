const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dashSchema = new Schema(
  {
    latest: [{
        name: String,
        value: String
    }],
    sync: [{
        title: String,
        assignees: [],
        link: String,
        status: String
    }]
  },
  { autoIndex: false }
);

const Dash = mongoose.model('Dash', dashSchema);
module.exports = Dash;