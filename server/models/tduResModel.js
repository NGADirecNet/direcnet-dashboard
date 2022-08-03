const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tduSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true
        },
        name: String,
        a_results: [{
            lost: Number,
            bytes: Number,
            kilobits: Number,
            total_bytes: Number,
            total_kilobits: Number,
            total_packets: Number,
            tx_tdu: Number,
            tx_seq_num: Number,
            tx_seq_num_mult: Number,
            tx_total_seq: Number,
            rx_tdu: Number,
            rx_seq_num: Number,
            rx_seq_num_mult: Number,
            rx_total_seq: Number,
            last_idx: Number
        }],
        b_results: [{
            lost: Number,
            bytes: Number,
            kilobits: Number,
            total_bytes: Number,
            total_kilobits: Number,
            total_packets: Number,
            tx_tdu: Number,
            tx_seq_num: Number,
            tx_seq_num_mult: Number,
            tx_total_seq: Number,
            rx_tdu: Number,
            rx_seq_num: Number,
            rx_seq_num_mult: Number,
            rx_total_seq: Number,
            last_idx: Number
        }]
    }
);

const TDULiteRes = mongoose.model('TDULiteRes', tduSchema);

module.exports = TDULiteRes;