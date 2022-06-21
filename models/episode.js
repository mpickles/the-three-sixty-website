const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Episode = mongoose.model('Episode', episodeSchema);  // looks for blogs collection in db
module.exports = Episode;

