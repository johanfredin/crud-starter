const mongoose = require('mongoose');

const Model = mongoose.model('Member', {
    name: String,
    age: Number
});

module.exports = Model;
