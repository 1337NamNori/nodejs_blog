const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 1000 },
    image: { type: String, maxLength: 255 },
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);
