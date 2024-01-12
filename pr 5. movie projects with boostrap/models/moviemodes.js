const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    fprice: {
        type: Number,
        required: true
    },
    oprice: {
        type: Number,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    // img: {
    //     type: String,
    //     required: true
    // },
});

const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;
