const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Slug Generator
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

//
const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    videoID: { type: String },
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now },
    slug: { type: String, slug: 'name', unique: true },
});

module.exports = mongoose.model('Course', Course);
